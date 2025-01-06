
start-pg:
	cd postgres && docker compose up -d postgres

stop-pg:
	cd postgres && docker compose down postgres

start-server:
	cd server && npm i
	cd server && npm run dev