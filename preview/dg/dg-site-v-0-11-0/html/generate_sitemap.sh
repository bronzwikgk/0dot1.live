#!/bin/bash

# Script to generate a single YAML sitemap from multiple HTML files in a folder

generate_sitemap_for_file() {
  local html_file=$1

  echo "  - title: \"$(basename "$html_file" .html | tr '-' ' ' | awk '{print toupper(substr($0,1,1))tolower(substr($0,2))}') Page\""
  echo "    url: \"./$(basename "$html_file")\""
  echo "    components:"
  
  # Parse header section
  echo "      - header:"
  echo "          navbar:"
  echo "            items:"
  
  # Extract and format each menu item under navbar
  sed -n 's/.*<a href="\([^"]*\)".*>\(.*\)<\/a>.*/\1 \2/p' "$html_file" | while read -r url title; do
    # Handle relative anchor links
    [[ $url =~ ^# ]] && url="./$(basename "$html_file")$url"
    echo "              - title: \"$title\""
    echo "                url: \"$url\""
  done

  # Detect sections
  echo "      - sections:"
  sed -n 's/.*<section[^>]* id="\([^"]*\)".*/\1/p' "$html_file" | while read -r section_id; do
    echo "          - title: \"$(echo "$section_id" | sed 's/-/ /g' | awk '{print toupper(substr($0,0,1))tolower(substr($0,2))}')\""
    echo "            id: \"$section_id\""
    echo "            content: \"Auto-generated content placeholder for $section_id\""
  done
}

# Main
if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <input_folder> <output_yaml_file>"
  exit 1
fi

input_folder=$1
output_file=$2

# Start YAML structure
echo "sitemap:" > "$output_file"

# Check if the input folder exists
if [[ ! -d $input_folder ]]; then
  echo "Error: Input folder '$input_folder' does not exist."
  exit 1
fi

# Loop through all HTML files in the folder and append each to the YAML file
for html_file in "$input_folder"/*.html; do
  if [[ -f $html_file ]]; then
    generate_sitemap_for_file "$html_file" >> "$output_file"
  fi
done

echo "YAML sitemap generated: $output_file"
