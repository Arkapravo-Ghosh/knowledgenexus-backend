/**
 * Converts a PDF buffer to text by converting pages to images and performing OCR
 * @param pdfBytes - Uint8Array containing the PDF data
 * @returns Promise resolving to the extracted text from all pages
 */
import { getDocument } from 'pdfjs-dist';
import { createCanvas } from 'canvas';
import { createWorker } from 'tesseract.js';
// Import specific Tesseract types

// Set the PDF.js worker path if needed
// import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
// GlobalWorkerOptions.workerSrc = '...path to pdf.worker.js';

export const pdfToText = async (pdfBytes: Uint8Array): Promise<string> => {
  if (!pdfBytes || pdfBytes.length === 0) {
    throw new Error('Invalid PDF data: Empty or undefined');
  }

  // Load the PDF document
  let pdfDocument;
  try {
    pdfDocument = await getDocument({ data: pdfBytes }).promise;
  } catch (error) {
    throw new Error(`Failed to load PDF document: ${error.message}`);
  }

  const numPages = pdfDocument.numPages;
  console.log(`PDF loaded with ${numPages} pages`);

  // Initialize OCR worker with proper API
  const worker = await createWorker('eng');
  try {
    // Modern Tesseract.js versions don't require these separate steps
    // or they're handled differently - adjust based on your version

    // Instead of:
    // await worker.loadLanguage('eng');
    // await worker.initialize('eng');

    // Use:
    await worker.load();

    // Some versions may not support setParameters exactly like this
    try {
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!()[]{}"\'-+=/\\@#$%^&*<> ',
      });
    } catch (paramError) {
      console.warn('Could not set OCR parameters:', paramError.message);
    }

    let allText = '';

    // Process each page
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      console.log(`Processing page ${pageNum} of ${numPages}`);
      try {
        // Get the page
        const page = await pdfDocument.getPage(pageNum);

        // Convert page to image
        const scale = 2.0; // Higher scale for better OCR results
        const viewport = page.getViewport({ scale });
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext('2d');

        // Render the page to canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          intent: 'print' // Use 'print' for higher quality
        };

        await page.render(renderContext).promise;

        // Convert canvas to image data
        const imageData = canvas.toBuffer('image/png');

        // Perform OCR on the image
        const { data } = await worker.recognize(imageData);
        allText += data.text + '\n\n'; // Add page break between pages

      } catch (pageError) {
        console.error(`Error processing page ${pageNum}: ${pageError.message}`);
        allText += `[Error extracting text from page ${pageNum}]\n\n`;
      }
    }

    return allText.trim();
  } catch (error) {
    throw new Error(`OCR processing failed: ${error.message}`);
  } finally {
    // Ensure resources are always cleaned up
    try {
      await worker.terminate();
    } catch (e) {
      console.error('Error terminating Tesseract worker:', e);
    }

    try {
      if (pdfDocument) {
        pdfDocument.destroy();
      }
    } catch (e) {
      console.error('Error destroying PDF document:', e);
    }
  }
}
