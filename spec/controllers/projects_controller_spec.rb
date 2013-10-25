require "spec_helper"

describe ProjectsController do

  let(:project) { FactoryGirl.build(:project) }
  let(:valid_session) {{}}

  describe "PUT" do
    it "should create a new video" do
      puts projects
      put :update, {projects: project}, valid_session
      expect(Project.all.count).to eq(1)
    end

    it "should delete a video"

    it "should update a video"

  end

end
