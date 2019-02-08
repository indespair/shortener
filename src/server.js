import path from 'path'
import Koa from 'koa'
import render from 'koa-ejs'
import Router from 'koa-router'
import shortid from 'shortid32'
import { parse as parseUrl } from 'url'
import level from 'level'

const buildUrl = url => {
  const parsed = parseUrl(url)
  return parsed.hostname ? parsed : parseUrl(`http://${url}`)
}

const devConsole = console

const app = new Koa()

app.context.db = level('./db', { valueEncoding: 'json' })

render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'html',
})

const router = new Router()

router.get('/', ctx => {
  return ctx.render('index')
})

router.get('/create', async ctx => {
  const url = buildUrl(ctx.request.query.url)

  if (!url.hostname) {
    return ctx.render('index', { errorMessage: 'Url is invalid!' })
  }

  const id = shortid.generate()

  await ctx.db.put(id, { url })

  return ctx.render('index', { id, url })
})

router.get('/:id', async ctx => {
  const { url } = await ctx.db.get(ctx.params.id)
  ctx.redirect(url.href)
})

app.use(router.routes())

app.listen(3333)

devConsole.log('Server is running on http://localhost:3333')
