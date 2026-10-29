import http from 'node:http';
import { execFileSync } from 'node:child_process';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const port = Number(process.env.PORT ?? 3001);

function toolVersion(cmd) {
  try {
    return execFileSync(cmd, ['--version'], { encoding: 'utf8' }).split('\n')[0];
  } catch {
    return 'not found';
  }
}

const tools = {
  'Node.js': process.version,
  'Claude Code': toolVersion('claude'),
  'GitHub CLI': toolVersion('gh'),
  Git: toolVersion('git'),
};

const escape = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const page = (title, body) => `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;color:#222}
h1{font-size:1.6rem}td{padding:.2rem 1rem .2rem 0}code{background:#f3f3f3;padding:.1rem .3rem}</style>
</head><body>${body}</body></html>`;

http
  .createServer(async (_req, res) => {
    try {
      const { rows } = await pool.query('SELECT message FROM welcome LIMIT 1');
      const toolRows = Object.entries(tools)
        .map(([name, version]) => `<tr><td>${name}</td><td><code>${escape(version)}</code></td></tr>`)
        .join('');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(page('Workshop ready', `<h1>${escape(rows[0].message)}</h1>
<p>This message was read from the Postgres database, so Docker, Compose, the database and the server all work.</p>
<table>${toolRows}</table>`));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(page('Database error', `<h1>The server could not read from the database</h1>
<p><code>${escape(String(err.message))}</code></p>
<p>Send a screenshot of this page to the trainer.</p>`));
    }
  })
  .listen(port, () => {
    console.log(`Ready: open http://localhost:3011 in your browser`);
  });
