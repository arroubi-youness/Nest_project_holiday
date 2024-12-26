import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';

// Fonction pour générer un PDF
export async function generatePDF(demande: any) {
  const pdfPath = `./demande_${demande._id}.pdf`;  // Chemin pour enregistrer le fichier PDF
  const doc = new PDFDocument();

  // Création du flux pour sauvegarder le fichier PDF
  doc.pipe(fs.createWriteStream(pdfPath));

  // Contenu du PDF
  doc.fontSize(20).text('Demande de Congé Acceptée', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Identifiant de la Demande : ${demande._id}`);
  doc.text(`Utilisateur : ${demande.User_id_ref}`);
  doc.text(`Statut : ${demande.demande_Status}`);
  doc.text(`Date de Début : ${new Date(demande.Start_date).toLocaleDateString()}`);
  doc.text(`Date de Fin : ${new Date(demande.End_date).toLocaleDateString()}`);
  doc.text(`Jours Restants : ${demande.Remainain_day}`);
  doc.end();

  
}

// Fonction pour envoyer un e-mail avec une pièce jointe
export async function sendEmailWithPDF(to: string, pdfPath: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'votre.email@gmail.com',  // Remplacez par votre adresse e-mail
      pass: 'votre_mot_de_passe_application',  // Utilisez un mot de passe d'application pour plus de sécurité
    },
  });

  const mailOptions = {
    from: 'votre.email@gmail.com',  // Adresse e-mail de l'expéditeur
    to: to,  // Adresse e-mail du destinataire
    subject: 'Confirmation de Demande de Congé',
    text: 'Votre demande de congé a été acceptée. Veuillez trouver les détails en pièce jointe.',
    attachments: [
      {
        filename: `Demande_de_congé.pdf`,  // Nom du fichier joint
        path: pdfPath,  // Chemin vers le fichier PDF
      },
    ],
  };

  // Envoi de l'e-mail
  await transporter.sendMail(mailOptions);
}

