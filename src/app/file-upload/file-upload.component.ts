import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientProcessingDto } from '../models/clientProcessingDto.interface';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  invalidFileTypeMsg = "Tipo de archivo no válido.";

  processInfo: ClientProcessingDto;

  constructor(private httpClient: HttpClient, private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // For future versions of this project this method could have multiple options for uploading
  // other data, for example clinics or veterinarians, this could be done by also adding a dropwdown menu
  // so user can select the kind of data to be uploaded
  uploadFile(event) {
    let file = event.files[0];
    this.clientService.createClients(file).subscribe(
      (result: any) => {
        this.processInfo = JSON.parse(result);
        alert(`Se crearon ${this.processInfo.createdClients} clientes exitosamente.`);
        alert(`Los siguientes documentos estaban duplicados o ya existían en la base de datos. ${this.processInfo.invalidDocuments}`)
        this.router.navigate(["/fileupload"]);
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

}
