# playwright-docker-repository
use --project=firefox for firefox browser
--project=webkit for safari

 Terminal:
 docker run --rm -it \
  mcr.microsoft.com/playwright:v1.42.1-jammy \
  bash -c "
    git clone https://github.com/shiru84/playwright-docker-repository.git &&
    cd playwright-docker-repository &&
    npm ci &&
    npx playwright install --with-deps &&                            
    npx playwright test e2e/Study/1332.study.spec.ts --project=chromium
  "
  docker run --rm -it --ipc=host mcr.microsoft.com/playwright:v1.57.0-noble \
  bash -lc "git clone https://github.com/shiru84/playwright-docker-repository.git && \
  cd playwright-docker-repository && \
  npm ci && \
  npx playwright test e2e/Study/1332.study.spec.ts --project=firefox"
