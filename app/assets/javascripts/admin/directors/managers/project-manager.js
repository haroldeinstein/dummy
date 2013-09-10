function ProjectManager() {
  this.videos = new VideosCollection();

  this.videos.fetch({success: function(response) {
    console.log(response);
  }});
}

ProjectManager.prototype = {

}
