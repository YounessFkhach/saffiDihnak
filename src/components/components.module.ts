import { NgModule } from '@angular/core';
import { VideoDetailComponent } from './video-detail/video-detail';
import { VideoListComponent } from './video-list/video-list';
@NgModule({
	declarations: [VideoDetailComponent,
    VideoListComponent],
	imports: [],
	exports: [VideoDetailComponent,
    VideoListComponent]
})
export class ComponentsModule {}
