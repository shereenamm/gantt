import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import "dhtmlx-gantt";
import { TaskService } from '../task.service';
import { LinkService } from '../link.service';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {

  @ViewChild("gantt_here", { static: true }) ganttContainer: ElementRef;
  html = 'Hello World';
  ngOnInit() {
    var resourceConfig = {    
      scale_height: 30      
  };
    this.taskService.get().then((tasks)=>{
      let tsk ="";
      tasks.filter((t)=>  typeof(t.parent) == "undefined").forEach((t)=>{
        let childCount = tasks.filter((c) => c.parent == t.id).length;
        tsk += '<div class="head" style="width:'+ childCount *100 + 'px">' + t.text + '</div>';
       });
       console.log(tsk);
       
       this.html = tsk;
       
       gantt.config.layout.rows[0].cols[2].html=this.html;
       gantt.init(this.ganttContainer.nativeElement);
      // gantt.render();
      // setTimeout(function(){ gantt.refreshData()},1000);
    });

    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.layout = {
      css: 'gantt_container',
      rows: [
        {
          config:resourceConfig,
          cols: [
            {

            },
            { resizer: true, width: 1 },
            {
              name:'hd',
              html: this.html,
              css: "custom-content",
              
            }
          ],
          gravity:1
        },
        { resizer: true, width: 1 },
        {
          cols: [
            {
              // the default grid view  
              view: "grid",
              scrollX: "scrollHor",
              scrollY: "scrollVer"
            },
            { resizer: true, width: 1 },
            {
              // the default timeline view
              view: "timeline",
              scrollX: "scrollHor",
              scrollY: "scrollVer"
            },
            {
              view: "scrollbar",
              id: "scrollVer"
            }
          ],
          gravity:6
        },
        {
          view: "scrollbar",
          id: "scrollHor"
        }
      ]
    }
    gantt.init(this.ganttContainer.nativeElement);
    Promise.all([this.taskService.get(), this.linkService.get()])
      .then(([data, links]) => {
        gantt.parse({ data, links });
      });
    

      
  }
  constructor(private taskService: TaskService, private linkService: LinkService) { }

}
