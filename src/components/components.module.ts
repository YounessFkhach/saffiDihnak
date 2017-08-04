import { NgModule } from '@angular/core';
import { VideoDetailComponent } from './video-detail/video-detail';
import { VideoListComponent } from './video-list/video-list';
import { VideoSearchComponent } from './video-search/video-search';
@NgModule({
	declarations: [VideoDetailComponent,
    VideoListComponent,
    VideoSearchComponent],
	imports: [],
	exports: [VideoDetailComponent,
    VideoListComponent,
    VideoSearchComponent]
})
export class ComponentsModule {}
