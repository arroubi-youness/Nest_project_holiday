import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
 @Injectable()
export class QrcodeService {
    async generateQRCode(): Promise<Buffer> {
        const currentDateTime = new Date().toISOString();  
        const url=currentDateTime;
        return await QRCode.toBuffer(url); 
      }
}
 