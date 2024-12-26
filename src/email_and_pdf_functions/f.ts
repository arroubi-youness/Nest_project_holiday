import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';



export async function generatePDF(demande: any, userName: string,familyName:string): Promise<any> {
try{
  const pdfPath = `./src/demande_${demande._id}.pdf`;
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(pdfPath));

 
  doc.fontSize(20).text('Demande de Congé Acceptée', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(
    `Nous avons le plaisir de vous informer que votre demande de congé a été acceptée. ` +
    `Votre congé est maintenant validé, et les détails sont les suivants :\n\n` +
    `Identifiant de la demande : ${demande._id}\n` +
    `Utilisateur :${familyName} ${userName} \n` +
    `Statut : ${demande.demande_Status}\n` +
    `Date de début du congé : ${new Date(demande.Start_date).toLocaleDateString()}\n` +
    `Date de fin du congé : ${new Date(demande.End_date).toLocaleDateString()}\n` +
    `Jours restants : ${demande.Remainain_day} jour(s).\n\n` +
    `De plus, voici les dates importantes liées à votre congé :\n` +
    `Votre congé commence le ${new Date(demande.Start_date).toLocaleDateString()} et se termine le ${new Date(demande.End_date).toLocaleDateString()}.\n` +
    `Nous vous souhaitons une excellente période de congé et restons disponibles pour toute information complémentaire.\n\n` +
    `Nous vous prions de bien vouloir respecter les dates indiquées pour le bon déroulement de votre congé .\n\n`
  ); 
  doc.fontSize(12).text(
    `Cordialement,\n` +
    `L'équipe des ressources humaines`,{ align: 'right' }
  );
  
  doc.end();

  return await pdfPath;

}
catch(error:unknown){
  if(error instanceof Error){
    console.log(error.message);
  }
}}



export async function sendEmailWithPDF(to: string, pdfPath: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7571314aec0534",
      pass: "d1068864335996"
  }
  });

  const mailOptions = {
    from: '63f2ba76c4-ac12fe@inbox.mailtrap.io',
    to: to,
    subject: 'Confirmation de Demande de Congé',
    text: 'Votre demande de congé a été acceptée. Veuillez trouver les détails en pièce jointe.',
    attachments: [
      {
        filename: `Demande_de_congé.pdf`,
        path: pdfPath, 
      },
    ],
  };


  await transporter.sendMail(mailOptions);
}

