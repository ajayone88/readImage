import { Component } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  fileChange(files: FileList){
    let file: File = files[0];
    this.doOCR(file).then(() =>{
      console.log("Completed");
    },()=>{
      console.log("Failed");
    });
  }

  async doOCR(file) {
    const worker = createWorker({
      logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {data : { text }} = await worker.recognize(file);
    console.log(text);
    await worker.terminate();
  }
}