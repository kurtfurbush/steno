## Project Description
Implement a basic web application which will list all upcoming jobs that still need a provider assigned, and when a job is selected, also show in that web application which providers may be a good fit for that job (ordering potential providers by best fit to worst fit).

## Instructions
* Please fullfil the requirements below and let us know when you're done and open a PR for review.
* You can use any language or framework you want

## Requirements
* Ingest the provided CSV files [jobs.csv](jobs.csv) and [providers.csv](providers.csv)
* A backend API should exist which enables getting all upcoming jobs, and for a given job it should return a list of providers which may be a good fit for each job ordered by best fit to worst fit
* There should be a frontend web component which displays all upcoming jobs
* On the front end, when a job is clicked on, somewhere on the page it should show all providers that may be a good fit for that job 

## Reasons why a provider may be better for a job then others
* Proximity (if the job is a location based job - the closer the reporter, the better)
* How quickly they have historically turned in their materials
* Cost (court reporter cost is calculated based on their $ per page) - the lower the better
* Ratings (firms can given binary feedback about providers they worked with - either yes they would work with them again, or no they wouldn't work with them again)

# How To Run
* Via `docker`
  * Run `build_and_start_ui_and_api.sh` in a bash shell
  * Open `http://localhost:3000`
* Via `yarn`
  * `cd ui && yarn start`
  * `cd api && yarn start`
  * Open `http://localhost:3000`
