FROM node:16.13.0-alpine3.14

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG KEYCLOCK_BASE_URL
ARG KEYCLOCK_CLIENT_ID
ARG KEYCLOCK_ENDPOINT
ARG GOOGLE_ANALYTICS_ID
ARG APPLICATION_ID_NEW_RELIC
ARG LICENSE_KEY_NEW_RELIC_ACCOUNT
ARG ACCOUNT_ID_NEW_RELIC
ARG NEW_RELIC_APP_NAME
ARG NEW_RELIC_LICENSE_KEY
ARG TINYMCE_API_KEY
ARG GOOGLE_MAPS_API_KEY
ARG URL_TABLEAU_JABARPROV
ARG URL_DASHBOARD_TAHURA
ARG USERNAME_TABLEAU
ARG URL_GET_TOKEN_TABLEAU
ARG UNLEASH_URL
ARG UNLEASH_TOKEN
ARG URL_MOCKAPI

ENV KEYCLOCK_BASE_URL $KEYCLOCK_BASE_URL
ENV KEYCLOCK_CLIENT_ID $KEYCLOCK_CLIENT_ID
ENV KEYCLOCK_ENDPOINT $KEYCLOCK_ENDPOINT
ENV HOST 0.0.0.0
ENV PORT 3000
ENV GOOGLE_ANALYTICS_ID $GOOGLE_ANALYTICS_ID
ENV APPLICATION_ID_NEW_RELIC $APPLICATION_ID_NEW_RELIC
ENV LICENSE_KEY_NEW_RELIC_ACCOUNT $LICENSE_KEY_NEW_RELIC_ACCOUNT
ENV ACCOUNT_ID_NEW_RELIC $ACCOUNT_ID_NEW_RELIC
ENV NEW_RELIC_APP_NAME $NEW_RELIC_APP_NAME
ENV NEW_RELIC_LICENSE_KEY $NEW_RELIC_LICENSE_KEY
ENV TINYMCE_API_KEY $TINYMCE_API_KEY
ENV GOOGLE_MAPS_API_KEY $GOOGLE_MAPS_API_KEY
ENV URL_TABLEAU_JABARPROV $URL_TABLEAU_JABARPROV
ENV URL_DASHBOARD_TAHURA $URL_DASHBOARD_TAHURA
ENV USERNAME_TABLEAU $USERNAME_TABLEAU
ENV URL_GET_TOKEN_TABLEAU $URL_GET_TOKEN_TABLEAU
ENV UNLEASH_URL $UNLEASH_URL
ENV UNLEASH_TOKEN $UNLEASH_TOKEN
ENV URL_MOCKAPI $URL_MOCKAPI



RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
