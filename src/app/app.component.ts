import { Component } from '@angular/core';
import { DataService } from './data.service';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Header } from "docx";
import * as fs from "fs";
import { Heading1Style } from 'docx/build/file/styles/style';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public list = [];
  public keyArray;
  public results = [];

  constructor(private DataService: DataService){
    //init data connection
    this.DataService = DataService;
    this.DataService.initDB();
    this.init();
    //console.log(this.keyArray);
  }

  ngOnInit() {
    
  }

  init(){
    //default to todays date
    // moment().format('YYYY-MM-DD');
  	this.DataService.query('reponsesByFormId/reponsesByFormId',moment().format('YYYY-MM-DD'))
        .then((result) => {
          this.list = result.rows;  
          //set array keys
          this.keyArray = Object.keys(this.list);
          //console.log(this.list );
        })
        .catch((error) => {
          console.log(error);
    });
  }
  filter(event: any){
    var param = event.target.value;
    this.DataService.query('reponsesByFormId/reponsesByFormId', param)
        .then((result) => {
          this.list = result.rows;   
          //set array keys
          this.keyArray = Object.keys(this.list);
          //console.log(this.list );
        })
        .catch((error) => {
          console.log(error);
      });
      
      console.log(param);
  }
  async generateDoc(event,id){
    const doc = new Document();

    var name = '';
    var subject = '';
    let grade: any;

    await this.DataService.getDocument(id)
    .then((result) => {      
      this.results = result.processedResult;   
      name = result.processedResult['user-profile.processedResult']['user-profile.item-1.first_name']+' '+result.processedResult['user-profile.processedResult']['user-profile.item-1.last_name']   
      if(result.processedResult['observing-cso-by-moe-tsc-rti.item-400.tt_obs_class.1']){
        grade = '1';
      }
      if(result.processedResult['observing-cso-by-moe-tsc-rti.item-400.tt_obs_class.2']){
        grade = '2';
      }
      if(result.processedResult['observing-cso-by-moe-tsc-rti.item-400.tt_obs_class.3']){
        grade = '3';
      }     
      if(result.processedResult['observing-cso-by-moe-tsc-rti.item-400.tt_obs_subject.1']){
        subject = 'English';
      }  
      if(result.processedResult['observing-cso-by-moe-tsc-rti.item-400.tt_obs_subject.2']){
        subject = 'Kiswahili';
      } 
      if(result.processedResult['observing-cso-by-moe-tsc-rti.item-400.tt_obs_subject.3']){
        subject = 'Maths';
      } 
    })
    .catch((error) => {
      console.log(error);
    });

    doc.addSection({
        properties: {},
        headers: {
          default: new Header(),
        },
        children: [
            new Paragraph({
              text: "Classroom Lesson Observation",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 400,
              }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "County: ",
                        bold: true,
                    }),
                    new TextRun(this.results['observing-cso-by-moe-tsc-rti.item-100.location.county_label']).tab(),
                ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "Sub-County: ",
                      bold: true,
                  }),
                  new TextRun(this.results['observing-cso-by-moe-tsc-rti.item-100.location.subcounty_label']).tab(),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "Zone: ",
                      bold: true,
                  }),
                  new TextRun(this.results['observing-cso-by-moe-tsc-rti.item-100.location.zone_label']).tab(),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "School: ",
                      bold: true,
                  }),
                  new TextRun(this.results['observing-cso-by-moe-tsc-rti.item-100.location.school_label']).tab(),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "Date: ",
                      bold: true,
                  }),
                  new TextRun(this.results['observing-cso-by-moe-tsc-rti.item-200.date20']).tab(),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "Enumerator: ",
                      bold: true,
                  }),
                  new TextRun(name).tab(),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "Grade: ",
                      bold: true,
                  }),
                  new TextRun(grade).tab(),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "Subject: ",
                      bold: true,
                  }),
                  new TextRun(subject).tab(),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "CSO Form ID: ",
                      bold: true,
                  }),
                  new TextRun(this.results['observing-cso-by-moe-tsc-rti.item-400.obs_id']).tab(),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: '',
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "What Went well",
                      bold: true,
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: '',
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: '',
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "What did not go well",
                      bold: true,
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: this.results['observing-cso-by-moe-tsc-rti.item-500.tt_obs_9'],
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: '',
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "Areas of improvement",
                      bold: true,
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: this.results['observing-cso-by-moe-tsc-rti.item-600.tt_obs_17b'],
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: '',
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "CSO Feedback to Teacher",
                      bold: true,
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: this.results['observing-cso-by-moe-tsc-rti.item-600.tt_obs_10b'],
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: '',
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "RTI Staff General comments",
                      bold: true,
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: this.results['observing-cso-by-moe-tsc-rti.item-700.tt_obs_19'],
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: '',
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: "RTI Staff Feedback to CSO",
                      bold: true,
                  }),
              ],
            }),
            new Paragraph({
              children: [
                  new TextRun({
                      text: this.results['observing-cso-by-moe-tsc-rti.item-700.tt_obs_20'],
                  }),
              ],
            }),
        ],
    });
    // Used to export the file into a .docx file
    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "clo.docx");
    });   
  }
}
