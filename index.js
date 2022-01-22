import cli from "cli-color"
import pkg from 'puppeteer';
import config from "./config.js"
import { sleep } from "./helpers.js"
import fs from "fs"

// SETTING UP BANNER FOR PT.FAIZAN SEJAHTERA SENTOSA SELAMANYA
function banner(){
    console.clear()
    console.log(cli.yellow(config.REI_BANNER))
}

// RUN AUTOMATICALLY
(async() => {
    banner()
    await sleep(1000)
    satset()
})()

async function satset(){
    const pup = pkg
    const listUrl = config.LIST_URL
    const listTwitter = config.LIST_TWITTER
    for(const acc of listTwitter){
        console.log(acc.username)
        const browser = await pup.launch({
            headless: false,
            args: [
                '--incognito'
            ]
        })
        const [page] = await browser.pages()
        await page.goto("https://twitter.com", {
            waitUntil: 'networkidle0'
        })
        await loginTwitter(page, acc)
        await sleep(3000)
        for(const url of listUrl){
            await page.evaluate((url) => {
                document.location.href = url
            }, url)
            console.log(cli.blue(`=== ${url} ===`))
            await fallawNlaick(page, acc.username)
            await retweet(page, acc.username)
        }
        await browser.close()
    }
}

async function fallawNlaick(page, username){
    await page.waitForSelector("div[data-testid='caret']")
    await page.click("div[data-testid='caret']")

    await sleep(1000)

    await page.waitForSelector("div[role='menuitem']")
    await page.click("div[role='menuitem']")

    console.log(cli.green(`[+] ${username} done follow`))
    await sleep(500)

    await page.waitForSelector("div[data-testid='like']")
    await page.click("div[data-testid='like']")

    console.log(cli.green(`[+] ${username} done like`))
    await sleep(500)
}

async function retweet(page, username){
    const listQuotes = config.LIST_QOUTE
    await sleep(1000)

    await page.waitForSelector("div[data-testid='retweet']")
    await page.click("div[data-testid='retweet']")

    await sleep(1000)

    await page.waitForSelector("div[data-testid='retweetConfirm']")
    await page.click("div[data-testid='retweetConfirm']")

    console.log(cli.green(`[+] ${username} done retweet`))
    await sleep(3000)

    await page.waitForSelector("div[data-testid='unretweet']")
    await page.click("div[data-testid='unretweet']")

    await sleep(3000)

    await page.waitForSelector("a[role='menuitem'][href='/compose/tweet']")
    await page.click("a[role='menuitem'][href='/compose/tweet']")

    const friends = await shuffle().slice(0, config.AMOUNT_RANDOM).toString().replace(/,/g, ' ')
    await page.waitForSelector("label[data-testid='tweetTextarea_0_label']")
    await page.type("label[data-testid='tweetTextarea_0_label']", listQuotes[Math.floor(Math.random() * listQuotes.length)] + " " + friends + " ", { delay: 100 })

    console.log(cli.green(`[+] ${username} done quote retweet`))
    await sleep(1000)

    await page.waitForSelector("div[data-testid='tweetButton']")
    await page.click("div[data-testid='tweetButton']")

    await sleep(100)
    await page.waitForXPath(`//a[contains(@href,"/${username}/status/")]`)
    const link = await page.$x(`//a[contains(@href,"/${username}/status/")]`)
    if (link.length > 0) {
        await link[0].click()
    }

    const linkAsli = page.url()
    fs.appendFileSync('result.txt', `${username}: ${linkAsli}\n`);
    console.log(cli.green(`[+] ${username} done retweet!`))
    console.log(cli.blue(`=========================`))
    await sleep(10000)
}

async function loginTwitter(page, acc){
    await page.waitForSelector("a[data-testid='loginButton']")
    await page.click("a[data-testid='loginButton']")

    await sleep(1000)

    await page.waitForSelector("#layers input[name='text']")
    await page.type("#layers input[name='text']", acc.username, { delay: 100 })

    await page.waitForSelector("#layers div:nth-child(6)")
    await page.click("#layers div:nth-child(6)")

    try {
        await page.waitForSelector("input[data-testid='ocfEnterTextTextInput']", {timeout: 2000});
        await page.type("input[data-testid='ocfEnterTextTextInput']", acc.email, { delay: 100 })
        await page.keyboard.press('Enter');
    } catch (error) {

    } 

    await page.waitForSelector("#layers input[name='password']")
    await page.type("#layers input[name='password']", acc.password, { delay: 100 })

    await page.click("div[data-testid='LoginForm_Login_Button']")

}

function shuffle() {
    const array = config.LIST_FRIENDS
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

