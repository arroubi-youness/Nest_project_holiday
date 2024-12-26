import { Controller,Get,Res } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { Response } from 'express';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}
  @Get('generate')
  async generateQRCode(@Res() res: Response): Promise<void> {
    
     const qrCodeBuffer = await this.qrcodeService.generateQRCode();

     res.set('Content-Type', 'image/png');
   
     res.send(qrCodeBuffer);
  }
}
