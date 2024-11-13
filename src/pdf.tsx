import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import test from "./exempEn.pdf"
const ModifyPdfExample: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Fonction pour charger et modifier le fichier PDF
  const modifyPdf = async () => {
    // 1. Charge le fichier PDF (par exemple à partir d'un URL ou fichier local)
    const existingPdfBytes = await fetch(test)
      .then(res => res.arrayBuffer());

    // 2. Charge le PDF avec PDF-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // 3. Ajouter les infos du client
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    firstPage.drawText('Hello, PDF-lib!', {
      x: 115,
      y: 665,
      size: 11,
      color: rgb(0, 0, 0), // Noir
    });
    firstPage.drawText('Hello, PDF-lib!', {
        x: 368,
        y: 665,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
      firstPage.drawText('Hello, PDF-libFJHDIYCYFVUGIOOMIUUY!', {
        x: 115,
        y: 618,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
      firstPage.drawText('Hello, PDF-lib!', {
        x: 115,
        y: 580,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
      firstPage.drawText('Hello, PDF-lib!', {
        x: 368,
        y: 580,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
      firstPage.drawText('Hello, PDF-lib!', {
        x: 115,
        y: 538,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
      firstPage.drawText('gdgcukgevelvklvbrkbnrk@gfjrevoie.hgzfizg', {
        x: 346,
        y: 538,
        size: 9,
        color: rgb(0, 0, 0), // Noir
      });
      

      firstPage.drawText('Hello, PDF-libFJHDIYC', {
        x: 115,
        y: 447,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
      firstPage.drawText('Hello, PDF-libFJHDIYCYFVUGIOOMIU', {
        x: 368,
        y: 447,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
      firstPage.drawText('Hello, PDF-libFJHDIYCYFVUGIOOMIU', {
        x: 115,
        y: 408,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
      firstPage.drawText('Hello, PDF-libFJHDIYCYFVUGIOOMIU', {
        x: 115,
        y: 360,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
      firstPage.drawText('Hello, PDF-libFJHDIYCYFVUGIOOMIU', {
        x: 115,
        y: 317,
        size: 11,
        color: rgb(0, 0, 0), // Noir
      });
    // 5. Sauvegarder le PDF modifié
    const pdfBytes = await pdfDoc.save();

    // 6. Créer un URL pour télécharger le PDF modifié
    const modifiedPdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    setPdfUrl(modifiedPdfUrl);
    console.log(modifiedPdfUrl)
  };

  return (
    <div>
      <button onClick={modifyPdf}>Modifier le PDF</button>
      
      {pdfUrl && (
        <a href={pdfUrl} download="modified-pdf.pdf">
          Télécharger le PDF modifié
        </a>
      )}
    </div>
  );
};

export default ModifyPdfExample;
