require "spec_helper"

describe NewsController do
  describe "routing" do
    it "should route to #index" do
      expect(get: "/news").to route_to(controller: "news", action: "index")
    end

    it "should route to #show" do
      expect(get: "/api/admin/news").to route_to(controller: "news", action: "show")
    end

    it "should route to #news_entries" do
      expect(get: "/api/admin/news-entries").to route_to(controller: "news", action: "news_entries")
    end

    it "should route to #update" do
      expect(put: "/api/admin/news").to route_to(controller: "news", action: "update")
    end
  end
end
