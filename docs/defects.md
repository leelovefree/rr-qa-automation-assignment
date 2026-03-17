# Defects

## DEF-01: Refreshing a direct URL does not load the result grid

Steps to reproduce:
1. Open Url: `https://tmdb-discover.surge.sh/popular`
2. Refresh the page

Expected result:
- The page loads successfully
- The result grid is still displayed

Actual result:
- The result grid is not displayed after refresh

Evidence:
- Reproduced with Playwright
- Screenshot, video, and trace are available in `test-results`

## DEF-02: Pagination near the end of the list does not load the result grid

Steps to reproduce:
1. Open `https://tmdb-discover.surge.sh`
2. Navigate to a later page near the end of the list, for example `55709`

Expected result:
- The selected page loads successfully
- The result grid is displayed

Actual result:
- The result grid is not displayed

Evidence:
- Reproduced with Playwright
- Screenshot, video, and trace are available in `test-results`

## DEF-03: Search keyword remains visible but results do not match after changing type

Steps to reproduce:
1. Open `https://tmdb-discover.surge.sh/popular`
2. Search for `The Talk`
3. Change type to `TV Shows`
4. Change type to `Movie`

Expected result:
- The results still match the visible search keyword
- Or the search keyword is cleared if the search is reset

Actual result:
- The search keyword remains visible in the UI
- But the results no longer match the keyword

Evidence:
- Reproduced manually during test execution
