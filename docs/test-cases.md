# Test Cases

## Core cases

### TC-01: Default page load
- Open the site
- Verify the page loads successfully
- Verify results are displayed

### TC-02: Category navigation
- Open the site
- Select a different category
- Verify the result list updates

### TC-03: Search by title
- Enter a title keyword
- Verify the result list updates

### TC-04: Filter by type
- Change the type between Movie and TV Shows
- Verify the result list updates

### TC-05: Filter by year
- Select a year or year range
- Verify the result list updates

### TC-06: Filter by rating
- Apply a rating filter
- Verify the result list updates

### TC-07: Filter by genre
- Select a genre
- Verify the result list updates

### TC-08: Apply multiple filters together
- Select type
- Select genre
- Select year
- Select rating
- Verify the result list updates correctly

### TC-09: Pagination
- Move to the next page
- Verify the page changes and results refresh

## Defect-focused cases

### TC-10: Refresh page on direct URL
- Open a direct URL such as `/popular`
- Refresh the page
- Verify whether the page still works correctly

### TC-11: TC-11: Check pagination near the end of the list
- Navigate to pages near the end of the list
- Record any issue found
