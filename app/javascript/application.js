// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

// Disabled Turbo Drive as javascript wasn't working after navigating to new page 
// https://stackoverflow.com/questions/71110271/events-not-loading-on-first-page-load-but-works-after-refresh
// import "@hotwired/turbo-rails"
import { Turbo } from "@hotwired/turbo-rails"
Turbo.session.drive = false
import "controllers"

import "./easymde.js"
import "./mathjax.js"
