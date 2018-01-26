# Create a Mayflower version folder to upload to S3

## How to update the Mayflower versions in the S3 bucket

1. Go directly to the [Mayflower Repository](https://github.com/massgov/mayflower) to find the latest release.
1. In the terminal cd into Mayflower Repository and `git checkout <release>`
1. Open an editor within the Mayflower folder go to the `styleguide/source/_data/url.json.example`
1. Copy the `url.json.example` and create a new file `url.json` 
1. In the `url.json` make changes to the following sections:
    1. Change the "domain" to `https://s3.amazonaws.com/mayflower.digital.mass.gov`
    1. Change the "asssetsPath" to `<release>/assets`
    1. Save the file
1. In the terminal run the following command `gulp prod`
1. Once complete go to Mayflower folder `styleguide/public/patterns/00-base/index.html` open the file and look at the script tag for the baseThemeCss `"https://s3.amazonaws.com/mayflower.digital.mass.gov/<release>/assets/css/base-theme-generated.css";`
The `<release>` in the URL above should include the correct release # from the terminal.
1. Select all files under `styleguide/public`folder and compress into zip file.
1. **Reminder to delete the `url.json` file you created before running gulp again in your local instance.** 


## Unzip the file before uploading to S3 bucket

Once the new zip file has been created next step is to unzip the the zip file before uploading to the S3 bucket:

1. In a terminal cd into the where the folder located
1. Unzip the file `unzip <folder name>.zip`
    1. Use only the the items in the `public` folder when uploading to the S3 bucket.

## Upload to S3 bucket

Note the s3 bucket we will be point at `s3://mayflower.digital.mass.gov/`

The following commands depends on if you are uploading to the Root or a Subfolder folder with AWS profile or not. The AWS profile will depend on how your AWS client is setup within your terminal.

Root folder

`aws s3 cp ./root/ s3://mayflower.digital.mass.gov/ --recursive`   

Root folder with AWS profile name 

`aws --profile <name> s3 cp ./root/ s3://mayflower.digital.mass.gov/ --recursive`

Subfolder 

`aws s3 cp ./folder/ s3://mayflower.digital.mass.gov/<folder> --recursive` 

Subfolder with AWS profile name 

`aws --profile <name> s3 cp ./folder/ s3://mayflower.digital.mass.gov/<folder> --recursive`
