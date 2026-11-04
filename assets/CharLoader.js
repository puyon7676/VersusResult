import { GameEnv } from "./GameEnv.js";
import { CharParseData, CharParseDebug } from "./CharDB.js";
import { CharSpecItem } from "./CharSpec.js";
function toPlainText(elem) {
    let result = "";
    /*
    elem.childNodes.forEach(node => {
        console.log(node.nodeType)
        console.log(Node.TEXT_NODE)
        if (node.nodeType === 3/*Node.TEXT_NODE* /) {
            // テキスト内の \n (改行コード) や余計な空白を削除・整理
            if (node.textContent !== null) {
                result += node.textContent.replace(/\s+/g, '');
            }
        }
        else if (node.nodeType === 1/*Node.ELEMENT_NODE* /) {
        }
        else if (node.nodeName === 'BR') {
            // <br> を見つけたら意図通り ',' に置換
            result += ",";
        }
    });
    */
    for (const node of elem.childNodes) {
        //console.log(node.nodeType)
        //console.log(Node.TEXT_NODE)
        if (node.nodeType === 3 /*Node.TEXT_NODE*/) {
            // テキスト内の \n (改行コード) や余計な空白を削除・整理
            if (node.textContent !== null) {
                result += node.textContent.replace(/\s+/g, '');
            }
        }
        else if (node.nodeType === 1 /*Node.ELEMENT_NODE*/) {
            if (node.nodeName === 'BR') {
                // <br> を見つけたら意図通り ',' に置換
                result += ",";
            }
            else if (node.textContent !== null) {
                result += node.textContent.replace(/\s+/g, '');
            }
        }
    }
    //console.log(`${elem.textContent} -> ${result}`)
    return result;
}
export class CharLoader {
    toImageHome = ""; //保存する画像ファイルのホームディレクトリ
    toImageExt = ".png"; //保存する画像ファイルの拡張子
    //static debug: boolean = false
    zip; //ロードした zipファイル
    async loadBrowserSavedZip(zipFile) {
        const env = new GameEnv;
        //this.charHome = env.charZip.substring(2) // "./"を取り除く
        const data = await env.loadBinFile(zipFile);
        if (env.isWebRunning)
            this.zip = await window.JSZip.loadAsync(data);
        else {
            //this.zip = await JSZip.loadAsync(data);
            const { loadZipNode } = await import(env.nodeToolsImportFilename);
            this.zip = await loadZipNode(data);
        }
    }
    async getHtmlFromZip(htmlFile) {
        const zipName = `${htmlFile}`;
        const file = this.zip.file(zipName);
        if (!file) {
            //throw new Error("[getHtml] ファイルがありません: " + htmlFile);
            console.error("[getHtml] ファイルがありません: " + htmlFile);
            return "";
        }
        const htmlText = await file.async("text");
        return htmlText;
    }
    async getHtmlFromURL(url) {
        // fetchでリクエストを送信
        const response = await fetch(url);
        // レスポンスが正常(200-299)か確認
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // テキスト（HTML）として取得
        const html = await response.text();
        return html;
    }
    /*
    public parsePuyoHtml = async (htmlText: string, callback: (parse: CharParseData) => void) => {
        let match = htmlText.indexOf(`<table class="a-table a-table tablesorter a-table" style="">`)
        let tableHtml = ""
        if (match >= 0) {
            tableHtml = htmlText.substring(match)
            const endMark = `</table>`
            match = tableHtml.indexOf(endMark)
            if (match >= 0) {
                tableHtml = tableHtml.substring(0, match + endMark.length)
            }
        }
        if (tableHtml === "")
            return null

        const env = new GameEnv
        const doc = await env.getDoc(tableHtml)

        // tablesorterクラスのテーブルを特定
        const table = doc.querySelector('.a-table.tablesorter');
        if (!table) return null;

        /*
        let validRows = 0
        const rows = table.querySelectorAll('tr');
        const characterData = await Array.from(rows).map(async row => {
            const cols = row.querySelectorAll('td');
            if (cols.length < 3) return null;

            const colCh = cols[0]
            //console.log(colCh)

            // 1. 画像タグを探す
            const imgTag = colCh.querySelector('img');
            let localImagePath = "";

            if (imgTag) {
                // 2. src属性から "./.../show(5)" のような文字列を取得
                const src = imgTag.getAttribute('src') || "";
                
                // 3. 正規表現やsplitで "show(数字)" の部分だけ抜き出す
                const match = src.match(/show\(\d+\)/);
                if (match) {
                    // "show(5).png" のように拡張子を補完して管理する
                    localImagePath = match[0];
                }
            }

            //キャラID : https://game8.jp/puyoque/134992
            let id = ""
            let hrefPath = "";
            const aTag = colCh.querySelector('a');
            if (aTag) {
                const href = aTag.getAttribute('href') || "";
                if (href.length >= 1) {
                    const words = href.split(`/`)
                    if (words.length >= 4) {
                        id = words[words.length - 1]
                        hrefPath = href
                    }
                }
            }

            const colRarity = cols[2]
            //const rarityText = colRarity.innerText; // "☆1~4" や "☆6~7"
            //const rarityText = colRarity.innerHTML; // "☆1~4" や "☆6~7"
            const rarityText = colRarity.textContent // "☆1~4" や "☆6~7"
            let rarity = ""
            if (rarityText !== undefined) {
                // 「6」が含まれているか、または正規表現で数値を取り出して判定
                if (rarityText.includes("6") || rarityText.includes("7")) {
                    rarity = rarityText
                }
            }

            const res = new CharParseData()
            res.name = colCh?.textContent?.trim()
            res.id = id
            res.rarity = rarity
            res.imageFileName = localImagePath
            res.contentURL = hrefPath
            //console.log(`[${res.imageFileName}]`)

            if (callback !== undefined) {
                validRows++
                res.nRow = validRows
                await callback(res)
            }

            return res
        });
        * /

        let validRows = 0
        const rows = table.querySelectorAll('tr');
        const rowArray = Array.from(rows);
        for (const row of rowArray) {
            const cols = row.querySelectorAll('td');
            if (cols.length < 3) continue;

            const colCh = cols[0]
            const name = colCh?.textContent?.trim()
            //console.log(colCh)
            if (name === null) {
                //キャラ名が未定義
                console.log(`excluded character name`)
                continue
            }

            //画像タグ
            const imgTag = colCh.querySelector('img');
            let localImagePath = "";

            if (imgTag) {
                // 2. src属性から "./.../show(5)" のような文字列を取得
                const src = imgTag.getAttribute('src') || "";
                
                // 3. 正規表現やsplitで "show(数字)" の部分だけ抜き出す
                const match = src.match(/show\(\d+\)/);
                if (match) {
                    // "show(5).png" のように拡張子を補完して管理する
                    localImagePath = match[0];
                }
            }

            //キャラID : https://game8.jp/puyoque/134992
            //          https://img.game8.jp/10425036/ce942ce498067436847cf19b96a3ebd8.png/show
            let id = ""
            let hrefPath = "";
            const aTag = colCh.querySelector('a');
            if (aTag) {
                const href = aTag.getAttribute('href') || "";
                if (href.length >= 1) {
                    const words = href.split(`/`)
                    if (words.length >= 4) {
                        id = words[words.length - 1]
                        if (id === `show`) {
                            id = words[words.length - 3]
                        }
                        //詳細ページは、HTML形式とイメージ形式があるみたい
                        hrefPath = href
                    }
                }
            }
            //id が <a>タグになく、<img>タグにあるケース（そもそも<a>タグがない）
            if (id === "") {
                //詳細URLも未設定みたい
                //const name = colCh?.textContent?.trim()
                console.log(`excluded undefined-id character : ${name}(${id})`)
                continue
            }
            //id を特定する文字列が未設定のケース
            if (id === "puyoque") {
                //詳細URLも未設定みたい
                //const name = colCh?.textContent?.trim()
                console.log(`excluded unknown-id character : ${name}(${id})`)
                continue
            }

            //レアリティ
            const colRarity = cols[2]
            //const rarityText = colRarity.innerText; // "☆1~4" や "☆6~7"
            //const rarityText = colRarity.innerHTML; // "☆1~4" や "☆6~7"
            const rarityText = colRarity.textContent // "☆1~4" や "☆6~7"
            let rarity = ""
            if (rarityText !== null) {
                // 「6」が含まれているか、または正規表現で数値を取り出して判定
                if (rarityText.includes("6") || rarityText.includes("7")) {
                    rarity = rarityText
                }
            }
            if (rarity === "") {
                //const name = colCh?.textContent?.trim()
                console.log(`excluded low rarity character : ${name}(${id})`)
                continue
            }

            const res = new CharParseData()
            res.name = name!
            res.id = id
            res.rarity = rarity
            res.imageFileName = localImagePath
            res.contentURL = hrefPath
            //console.log(`[${res.imageFileName}]`)

            if (callback !== undefined) {
                validRows++
                res.nRow = validRows
                await callback(res)
            }
        }
        
        console.log(`[parsePuyoHtml] ${validRows} valid parsed!`)
        return validRows
    }
    */
    /*
    public async savePuyoData(dataBasePath: string) {
        const parseSources = [
            { ns: CharNameSpaceTypes.CnsRed, nsKey: "01_赤属性", nsName: "赤属性", zipName: "puyoQueRed.zip", jsonName: "puyoQueRed.json" },
            { ns: CharNameSpaceTypes.CnsBlue, nsKey: "02_青属性", nsName: "青属性", zipName: "puyoQueBlue.zip", jsonName: "puyoQueBlue.json" },
            { ns: CharNameSpaceTypes.CnsGreen, nsKey: "03_緑属性", nsName: "緑属性", zipName: "puyoQueGreen.zip", jsonName: "puyoQueGreen.json" },
            { ns: CharNameSpaceTypes.CnsYellow, nsKey: "04_黄属性", nsName: "黄属性", zipName: "puyoQueYellow.zip", jsonName: "puyoQueYellow.json" },
            { ns: CharNameSpaceTypes.CnsViolet, nsKey: "05_紫属性", nsName: "紫属性", zipName: "puyoQueViolet.zip", jsonName: "puyoQueViolet.json" },
        ]
        const chListSave = new Array<CharSpecItem>
        //const charLoader = new CharLoader
        //const toZipInst = await charLoader.createZip()
        //this.toImageHome = charLoader.toImageHome

        //load browser zip
        await this.loadBrowserSavedZip(`${dataBasePath}/PuyoBrowserSaved.zip`)

        //assin parser
        //const parser = charLoader.parsePuyoHtml

        //save char zip
        for (const item of parseSources) {
            console.log(`scanning ${item.nsName} ...`)

            const charLoader = new CharLoader
            const toZipInst = await charLoader.createZip()
            this.toImageHome = charLoader.toImageHome

            //assin parser
            const parser = charLoader.parsePuyoHtml

            const zipBase = `ぷよクエ_HTML保存/${item.nsKey}/【ぷよクエ】${item.nsName}キャラの評価一覧｜ゲームエイト`
            const parseRes = await this.scanZip(item.ns, zipBase, parser, toZipInst, chListSave)

            const saveZipFile = `${item.zipName}`
            await charLoader.saveZip(toZipInst, saveZipFile)
            console.log(`saved char zip : ${saveZipFile}`)
        }
        //const saveZipFile = "puyoQue.zip"
        //await charLoader.saveZip(toZipInst, saveZipFile)
        //console.log(`saved char zip : ${saveZipFile}`)

        //save char json
        const saveJsonFile = "puyoQue.json"
        const chSpecList = new CharSpecSet
        chSpecList.chList = chListSave
        const env = new GameEnv
        await env.saveJson(saveJsonFile, chSpecList.chList)
        console.log(`saved char json : ${saveJsonFile}`)
    }
    */
    /*
    public parsePuyoHtmlDataSrc = async (htmlText: string, callback: (parse: CharParseData) => void) => {
        let match = htmlText.indexOf(`<table class="a-table a-table tablesorter a-table" style="">`)
        let tableHtml = ""
        if (match >= 0) {
            tableHtml = htmlText.substring(match)
            const endMark = `</table>`
            match = tableHtml.indexOf(endMark)
            if (match >= 0) {
                tableHtml = tableHtml.substring(0, match + endMark.length)
            }
        }
        if (tableHtml === "")
            return null

        const env = new GameEnv
        const doc = await env.getDoc(tableHtml)

        // tablesorterクラスのテーブルを特定
        const table = doc.querySelector('.a-table.tablesorter');
        if (!table) return null;

        let validRows = 0
        const rows = table.querySelectorAll('tr');
        const rowArray = Array.from(rows);
        for (const row of rowArray) {
            const cols = row.querySelectorAll('td');
            if (cols.length < 3) continue;

            const colCh = cols[0]
            const name = colCh?.textContent?.trim()
            //console.log(colCh)
            if (name === null) {
                //キャラ名が未定義
                console.log(`excluded character name`)
                continue
            }

            //画像タグ
            const imgTag = colCh.querySelector('img');
            let localImagePath = "";

            if (imgTag) {
                /*
                // 2. src属性から "./.../show(5)" のような文字列を取得
                const src = imgTag.getAttribute('src') || "";
                
                // 3. 正規表現やsplitで "show(数字)" の部分だけ抜き出す
                const match = src.match(/show\(\d+\)/);
                if (match) {
                    // "show(5).png" のように拡張子を補完して管理する
                    localImagePath = match[0];
                }
                * /
                const datasrc = imgTag.getAttribute('data-src') || ""
                localImagePath = datasrc
            }

            //キャラID : https://game8.jp/puyoque/134992
            //          https://img.game8.jp/10425036/ce942ce498067436847cf19b96a3ebd8.png/show
            let id = ""
            let hrefPath = "";
            const aTag = colCh.querySelector('a');
            if (aTag) {
                const href = aTag.getAttribute('href') || "";
                if (href.length >= 1) {
                    const words = href.split(`/`)
                    if (words.length >= 4) {
                        id = words[words.length - 1]
                        if (id === `show`) {
                            id = words[words.length - 3]
                        }
                        //詳細ページは、HTML形式とイメージ形式があるみたい
                        hrefPath = href
                    }
                }
            }
            //id が <a>タグになく、<img>タグにあるケース（そもそも<a>タグがない）
            if (id === "") {
                //詳細URLも未設定みたい
                //const name = colCh?.textContent?.trim()
                console.log(`excluded undefined-id character : ${name}(${id})`)
                continue
            }
            //id を特定する文字列が未設定のケース
            if (id === "puyoque") {
                //詳細URLも未設定みたい
                //const name = colCh?.textContent?.trim()
                console.log(`excluded unknown-id character : ${name}(${id})`)
                continue
            }

            //レアリティ
            const colRarity = cols[2]
            const rarityText = colRarity.textContent // "☆1~4" や "☆6~7"
            let rarity = ""
            if (rarityText !== null) {
                // 「6」が含まれているか、または正規表現で数値を取り出して判定
                if (rarityText.includes("6") || rarityText.includes("7")) {
                    rarity = rarityText
                }
            }
            if (rarity === "") {
                console.log(`excluded low rarity character : ${name}(${id})`)
                continue
            }

            const res = new CharParseData()
            res.name = name!
            res.id = id
            res.rarity = rarity
            res.imageFileName = localImagePath
            res.contentURL = hrefPath
            //console.log(`[${res.imageFileName}]`)

            if (callback !== undefined) {
                validRows++
                res.nRow = validRows
                await callback(res)
            }
        }
        
        console.log(`[parsePuyoHtmlDataSrc] ${validRows} valid parsed!`)
        return validRows
    }
    */
    /*
    public async scanPuyoZip(zip: any) {
        const parseSources = [
            { ns: CharNameSpaceTypes.CnsRed, nsKey: "01_赤属性", nsName: "赤属性", zipName: "puyoQueRed.zip", jsonName: "puyoQueRed.json" },
            { ns: CharNameSpaceTypes.CnsBlue, nsKey: "02_青属性", nsName: "青属性", zipName: "puyoQueBlue.zip", jsonName: "puyoQueBlue.json" },
            { ns: CharNameSpaceTypes.CnsGreen, nsKey: "03_緑属性", nsName: "緑属性", zipName: "puyoQueGreen.zip", jsonName: "puyoQueGreen.json" },
            { ns: CharNameSpaceTypes.CnsYellow, nsKey: "04_黄属性", nsName: "黄属性", zipName: "puyoQueYellow.zip", jsonName: "puyoQueYellow.json" },
            { ns: CharNameSpaceTypes.CnsViolet, nsKey: "05_紫属性", nsName: "紫属性", zipName: "puyoQueViolet.zip", jsonName: "puyoQueViolet.json" },
        ]
        const chListSave = new Array<CharSpecItem>
        this.zip = zip

        for (const item of parseSources) {
            console.log(`scanning ${item.nsName} ...`)

            const charLoader = new CharLoader
            const toImgsZip = await charLoader.createZip()
            this.toImageHome = charLoader.toImageHome

            //assin parser
            const parser = charLoader.parsePuyoHtml

            const zipBase = `ぷよクエ_HTML保存/${item.nsKey}/【ぷよクエ】${item.nsName}キャラの評価一覧｜ゲームエイト`
            const parseRes = await this.scanZip(item.ns, zipBase, parser, toImgsZip, chListSave)

            //キャラ画像は属性毎に１ファイルZipで保存
            const saveZipFile = `${item.zipName}`
            await charLoader.saveZip(toImgsZip, saveZipFile)
            console.log(`saved char zip : ${saveZipFile}`)
            //console.log(toImgsZip)
        }

        //キャラ一覧は全属性で１ファイル(json圧縮なし)で保存
        //console.log(chListSave)
        const saveJsonFile = `chListFile_puyo.json`
        this.downloadJson(chListSave, saveJsonFile)
        console.log(`saved char json : ${saveJsonFile}`)

        //キャラ詳細作成用コマンドファイルは全属性で１ファイル(プレーンテキスト圧縮なし)で保存
        let cmdTextAll = ``
        for (const ch of chListSave) {
            let echoCmd = `echo now downloading "${ch.name}"`
            let cmdText = echoCmd + `\r\n` + `curl --ssl-no-revoke "${ch.contentURL}" > "puyoStatus_${ch.id}.txt"`
            if (cmdTextAll === ``)  cmdTextAll += cmdText
            else                    cmdTextAll += `\r\n` + cmdText
        }
        const saveTextFile = `chCmdFile_puyo.txt`
        this.downloadText(cmdTextAll, saveTextFile)
        console.log(`saved char json : ${saveJsonFile}`)
    }
    */
    async parsePuyoInfoHtml(htmlText, callback) {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        //"タイプ,コンビネーション"用パーサ
        //複数<tr>内の、<th><td>ペアから、対象文字列を含んでいるか確認
        //※<th>のカラム位置と<td>のカラム位置が同じ
        //　ただし、<th>複数行の場合は次の<th>内の<td>が対象
        //　ただし、<th>１行の場合は同じ<th>内の<td>が対象
        function doParseStdInfo(rowArray, hContent) {
            let rowIndex = -1;
            let colIndex = -1;
            let rowValue = -1;
            let matchRule = null;
            for (const rowElem of rowArray) {
                rowIndex++;
                const ths = rowElem.querySelectorAll('th');
                const nTh = ths.length;
                let index = -1;
                for (const th of ths) {
                    //console.log(`[doParseStdInfo] th [${th.textContent}]`)
                    index++;
                    if (th.textContent === null)
                        continue;
                    const match = findRule(th.textContent, hContent);
                    if (match) {
                        colIndex = index;
                        rowValue = nTh >= 2 ? rowIndex + 1 : rowIndex;
                        matchRule = match;
                        const rowElemRef = rowArray[rowValue];
                        const tds = rowElemRef.querySelectorAll('td');
                        index = -1;
                        for (const td of tds) {
                            //console.log(`[doParseStdInfo] td [${td.textContent}]`)
                            index++;
                            if (index === colIndex) {
                                //const status = td.textContent.replace(/\n/g, ``)
                                const status = toPlainText(td);
                                if (CharParseDebug.debug)
                                    console.log(`[doParseStdInfo] found "基本情報"::combination [${status}]`);
                                if (matchRule) {
                                    matchRule.value = status;
                                }
                                break;
                            }
                        }
                        //break
                    }
                }
                //if (colIndex !== -1) break
            }
            //if (colIndex === -1) return
        }
        //"たいりょく,こうげき,かいふく"用パーサ（ステータス用）
        //複数<tr>内の、分離された<th><td>ペアから、対象文字列を含んでいるか確認
        //※<th>のカラム位置=0、<td>のカラム位置=1
        function doParseStatusInfo(rowArray, hContent) {
            let matchRule = null;
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th');
                if (ths.length < 1)
                    continue;
                if (ths[0].textContent === null)
                    continue;
                const match = findRule(ths[0].textContent, hContent);
                if (match) {
                    matchRule = match;
                }
                else
                    continue;
                const cols = row.querySelectorAll('td');
                for (const col of cols) {
                    if (col.textContent === null)
                        continue;
                    const status = col.textContent.replace(/\n/g, ``);
                    if (status === ``)
                        continue;
                    if (CharParseDebug.debug)
                        console.log(`[doParseStatusInfo] found "ステータス"::${matchRule.find} [${status}]`);
                    if (matchRule) {
                        matchRule.value = status;
                    }
                    break;
                }
                /*
                if (cols.length < 2) continue;

                const colStatus = cols[1]
                if (CharLoader.debug)
                console.log(`[doParseStatusInfo] found "ステータス"::${matchRule.find} [${colStatus.textContent}]`)

                if (matchRule) {
                    matchRule.value = colStatus.textContent
                }
                */
            }
        }
        //"たいりょく,こうげき,かいふく"用パーサ（とっくん用）
        //複数<tr>内の、分離された<th><td>ペアから、対象文字列を含んでいるか確認
        //※<th>のカラム位置と<td>のカラム位置が同じ
        function doParseTokkunInfo(rowArray, hContent) {
            let thsList = null;
            let tdsList = null;
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th');
                const tds = row.querySelectorAll('td');
                if (ths.length >= 1) {
                    thsList = ths;
                }
                if (tds.length >= 1) {
                    tdsList = tds;
                }
            }
            if (thsList !== null && tdsList !== null) {
                for (let index = 0; index < thsList.length; index++) {
                    const key = thsList[index].textContent;
                    if (key === null)
                        continue;
                    const match = findRule(key, hContent);
                    if (match) {
                        const matchRule = match;
                        const colIndex = index;
                        if (tdsList.length >= 1 && colIndex >= 0) {
                            const colStatus = tdsList[colIndex];
                            let status = colStatus.textContent;
                            status = status !== null ? status.replace(/\n/g, ``) : ``;
                            if (CharParseDebug.debug)
                                console.log(`[doParseTokkunInfo] found "とっくん"::${matchRule.find} [${status}]`);
                            if (matchRule) {
                                matchRule.value = status;
                            }
                        }
                    }
                }
            }
        }
        //"とくもりサポートスキル"用パーサ
        //複数<tr>内の、先頭<th>から、対象文字列を含んでいるか確認
        function doParseTokumoriInfo(rowArray, hContent) {
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th');
                if (ths.length < 1)
                    continue;
                const key = ths[0].textContent;
                if (key === null)
                    continue;
                let matchRule = null;
                const match = findRule(key, hContent);
                if (match) {
                    matchRule = match;
                }
                else
                    continue;
                if (CharParseDebug.debug)
                    console.log(`[doParseTokumoriInfo] found "とくもりスキル"::${matchRule.find} [${matchRule.key}]`);
                if (matchRule) {
                    matchRule.value = `enable`;
                }
            }
        }
        //スキル用パーサ
        function doParseSkillInfo(rowArray, hContent) {
            let skillName = ``;
            let skillAbility = ``;
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th');
                if (ths.length >= 1)
                    skillName = ths[0].textContent;
                const tds = row.querySelectorAll('td');
                if (tds.length >= 1) {
                    let result = ``;
                    for (const td of tds) {
                        for (const node of td.childNodes) {
                            console.log(node.nodeType, node.textContent);
                            if (node.nodeType === 3 /*Node.TEXT_NODE*/) {
                                if (node.textContent !== null) {
                                    if (result !== ``)
                                        result += '<br>';
                                    //\nを<br>へ置き換え
                                    result += node.textContent.replace(/\s+/g, '<br>');
                                }
                            }
                            else if (node.nodeType === 1 /*Node.ELEMENT_NODE*/) {
                                if (node.textContent !== null) {
                                    if (result !== ``)
                                        result += '<br>';
                                    //\nを<br>へ置き換え
                                    result += node.textContent.replace(/\s+/g, '<br>');
                                }
                            }
                        }
                        if (result === ``)
                            continue;
                        if (result !== `<br>`)
                            break;
                    }
                    skillAbility = result;
                }
            }
            if (skillName !== `` && skillAbility !== ``) {
                let matchRule = null;
                const match = findRule(hContent, ``);
                if (match) {
                    matchRule = match;
                }
                else
                    return;
                //if (CharLoader.debug)
                console.log(`[doParseSkillInfo] found "${hContent}"::${skillName} [${skillAbility}]`);
                if (matchRule) {
                    matchRule.value = `${skillName}=${skillAbility}`;
                }
            }
            /*連続する <br> を1つにまとめて前後を掃除！
            // 💡 仕上げ：連続する <br> を1つにまとめて前後を掃除！
            skillAbility = result
                .replace(/(<br\s*\/?>\s*)+/g, '<br>') // 連続 <br> を1つに集約
                .replace(/^<br\s*\/?>|<br\s*\/?>$/g, ''); // 先頭・末尾の <br> を除去            */
        }
        //パーサ選択
        function doParse(hSelector) {
            const headers = doc.querySelectorAll(hSelector);
            for (const hElem of headers) {
                const patternId = hElem.getAttribute('id') || "";
                const headerText = hElem.textContent !== null ? hElem.textContent.trim() : ``;
                if (CharParseDebug.debug)
                    console.log(`${hSelector}::${patternId}::${headerText}`);
                let hContent = ``;
                let infoParser = null;
                let rowArray = null;
                let nextEl = hElem.nextElementSibling;
                while (nextEl) {
                    const tagName = nextEl.tagName;
                    if (tagName === `TABLE`) {
                        if (hElem.className === `a-header--3`) {
                            //スキル関連？
                            if (headerText === 'リーダースキル') {
                                console.log(`assume doParseLeaderSkillInfo`);
                                hContent = headerText;
                                infoParser = doParseSkillInfo;
                            }
                            else if (headerText === 'フルパワースキル') {
                                console.log(`assume doParseFpSkillInfo`);
                                hContent = headerText;
                                infoParser = doParseSkillInfo;
                            }
                            else if (headerText.includes('デュアルシフト') && headerText.includes('スキル')) {
                                console.log(`assume doParseDsSkillInfo`);
                                hContent = 'デュアルシフトスキル';
                                infoParser = doParseSkillInfo;
                            }
                            else if (headerText.includes('ダブルパワー') && headerText.includes('スキル')) {
                                if (!headerText.includes('持ち')) {
                                    console.log(`assume doParseDpSkillInfo`);
                                    hContent = 'ダブルパワースキル';
                                    infoParser = doParseSkillInfo;
                                }
                            }
                            else if (headerText === 'クロスアビリティ') {
                                console.log(`assume doParseCaInfo`);
                                hContent = headerText;
                                infoParser = doParseSkillInfo;
                            }
                            else if (headerText === 'ブーストエリア') {
                                console.log(`assume doParseBaInfo`);
                                hContent = 'ブーストエリア';
                                infoParser = doParseSkillInfo;
                            }
                            else if (headerText === 'スキル') {
                                console.log(`assume doParseNormalSkillInfo`);
                                hContent = headerText;
                                infoParser = doParseSkillInfo;
                            }
                            if (infoParser !== null) {
                                const table = nextEl;
                                const rows = table.querySelectorAll('tr');
                                rowArray = Array.from(rows);
                                if (rowArray.length >= 1)
                                    break;
                            }
                        }
                        const title = nextEl.textContent !== null ? nextEl.textContent.trim() : ``;
                        if (title.includes('タイプ') && title.includes('コンビネーション')) {
                            infoParser = doParseStdInfo;
                            //console.log(`assume doParseStdInfo`)
                        }
                        else if (title.includes('たいりょく') && title.includes('こうげき') && title.includes('かいふく')) {
                            if (headerText.includes('ステータス')) {
                                hContent = 'ステータス';
                                infoParser = doParseStatusInfo;
                                //console.log(`assume doParseStatusInfo`)
                            }
                            else if (headerText.includes('おすすめとっくん')) {
                                hContent = 'おすすめとっくん';
                                infoParser = doParseTokkunInfo;
                                //console.log(`assume doParseTokkunInfo`)
                            }
                        }
                        else if ((title.includes('とくもりスキル') ||
                            title.includes('とくもりサポートスキル') ||
                            title.includes('とくもりキラースキル')) &&
                            (headerText === `とくもりスキル` ||
                                headerText === `とくもりサポートスキル`)) {
                            infoParser = doParseTokumoriInfo;
                            //console.log(`assume doParseTokumoriInfo`)
                        }
                        if (infoParser !== null) {
                            const table = nextEl;
                            const rows = table.querySelectorAll('tr');
                            rowArray = Array.from(rows);
                            if (rowArray.length >= 1)
                                break;
                        }
                    }
                    nextEl = nextEl.nextElementSibling;
                }
                if (rowArray === null)
                    continue;
                if (infoParser === null)
                    continue;
                infoParser(rowArray, hContent);
            }
        }
        const parseRules = [
            { hContent: `ステータス`, find: `たいりょく`, key: `pqStatusHP`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `こうげき`, key: `pqStatusATK`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `かいふく`, key: `pqStatusREC`, value: ``, need: true, useCombo: false },
            { hContent: `おすすめとっくん`, find: `たいりょく`, key: `pqTokkunHP`, value: ``, need: false, useCombo: false },
            { hContent: `おすすめとっくん`, find: `こうげき`, key: `pqTokkunATK`, value: ``, need: false, useCombo: false },
            { hContent: `おすすめとっくん`, find: `かいふく`, key: `pqTokkunREC`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `とくもりスキル①`, key: `pqTokuSp1`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `とくもりスキル②`, key: `pqTokuSp2`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `とくもりサポートスキル`, key: `pqTokuSp1`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `とくもりキラースキル`, key: `pqTokuSp2`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `タイプ`, key: `pqStatusType`, value: ``, need: true, useCombo: true },
            { hContent: ``, find: `コンビネーション`, key: `pqStatusCombo`, value: ``, need: true, useCombo: true },
            { hContent: ``, find: `シリーズ`, key: `pqStatusSeries`, value: ``, need: true, useCombo: true },
            { hContent: ``, find: `リーダースキル`, key: `pqLeaderSkill`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `フルパワースキル`, key: `pqFpSkill`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `デュアルシフトスキル`, key: `pqDsSkill`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `ダブルパワースキル`, key: `pqDpSkill`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `クロスアビリティ`, key: `pqCa`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `ブーストエリア`, key: `pqBa`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `スキル`, key: `pqNormalSkill`, value: ``, need: false, useCombo: false },
        ];
        function findRule(findText, hContent) {
            const match = parseRules.find(item => item.find === findText && item.hContent === hContent);
            if (match)
                return match;
            return null;
        }
        doParse('h2.a-header--2');
        doParse('h3.a-header--3');
        let nEmpty = 0;
        parseRules.forEach(rule => { if (rule.need && rule.value === ``)
            nEmpty++; });
        if (nEmpty >= 1) {
            console.log(`cannot info parsed !`);
            parseRules.forEach(rule => { if (rule.need && rule.value === ``)
                console.log(`empty [${rule.find}]`); });
        }
        else {
            if (CharParseDebug.debug)
                console.log(`success all info parsed !`);
            if (callback)
                callback(parseRules);
            return true;
        }
        return false;
    }
    parseMemeHtml = async (htmlText, callback) => {
        let match = htmlText.indexOf(`<table class="result_table all-center tableLine">`);
        let tableHtml = "";
        if (match >= 0) {
            tableHtml = htmlText.substring(match);
            const endMark = `</table>`;
            match = tableHtml.indexOf(endMark);
            if (match >= 0) {
                tableHtml = tableHtml.substring(0, match + endMark.length);
            }
        }
        if (tableHtml === "")
            return null;
        const env = new GameEnv;
        const doc = await env.getDoc(tableHtml);
        // tablesorterクラスのテーブルを特定
        const table = doc.querySelector('.result_table.tableLine');
        if (!table)
            return null;
        /*
        let validRows = 0
        const rows = table.querySelectorAll('tr');
        const characterData = await Array.from(rows).map(async row => {
            const cols = row.querySelectorAll('td');
            if (cols.length < 5) return null;

            //[0]キャラ:id,img,name
            //[1]点数
            //[2]レア
            //[3]職業
            //[4]役割(Role)

            const colCh = cols[0]
            //console.log(colCh)
            //キャラID : <a href="https://altema.jp/mememori/chara/3">
            let id = ""
            let hrefPath = "";
            const aTag = colCh.querySelector('a');
            if (aTag) {
                const href = aTag.getAttribute('href') || "";
                if (href.length >= 1) {
                    const words = href.split(`/`)
                    if (words.length >= 4) {
                        id = words[words.length - 1]
                        hrefPath = href
                    }
                }
            }
            //画像タグ : <img src="./【メメントモリ】藍属性キャラ一覧【メメモリ】 - アルテマ_files/4.jpg"
            const imgTag = colCh.querySelector('img');
            let localImagePath = "";
            if (imgTag) {
                const src = imgTag.getAttribute('src') || "";
                if (src.length >= 1) {
                    const words = src.split(`/`)
                    if (words.length >= 2) {
                        localImagePath = words[words.length - 1]
                    }
                }
            }

            //レアリティ
            const colRarity = cols[2]
            const rarityText = colRarity.textContent    //"N","R","R+","SR"
            let rarity = ""
            if (rarityText !== undefined) {
                //"N" 以外対象にする
                if (rarityText === "R" || rarityText === "R+" || rarityText === "SR") {
                    rarity = rarityText
                }
            }

            //役割(Role)
            const colRole = cols[4]

            const res = new CharParseData()
            res.name = colCh?.textContent?.trim()
            res.id = id
            res.rarity = rarity
            res.imageFileName = localImagePath
            res.contentURL = hrefPath
            //console.log(`[${res.imageFileName}]`)

            if (callback !== undefined) {
                validRows++
                res.nRow = validRows
                await callback(res)
            }

            return res
        });
        */
        let validRows = 0;
        const rows = table.querySelectorAll('tr');
        const rowArray = Array.from(rows);
        for (const row of rowArray) {
            const cols = row.querySelectorAll('td');
            if (cols.length < 5)
                continue;
            //[0]キャラ:id,img,name
            //[1]点数
            //[2]レア
            //[3]職業
            //[4]役割(Role)
            const colCh = cols[0];
            const name = colCh.textContent;
            if (name === null)
                continue;
            //console.log(colCh)
            //キャラID : <a href="https://altema.jp/mememori/chara/3">
            let id = "";
            let hrefPath = "";
            const aTag = colCh.querySelector('a');
            if (aTag) {
                const href = aTag.getAttribute('href') || "";
                if (href.length >= 1) {
                    const words = href.split(`/`);
                    if (words.length >= 4) {
                        id = words[words.length - 1];
                        hrefPath = href;
                    }
                }
            }
            //画像タグ : <img src="./【メメントモリ】藍属性キャラ一覧【メメモリ】 - アルテマ_files/4.jpg"
            const imgTag = colCh.querySelector('img');
            let localImagePath = "";
            if (imgTag) {
                const src = imgTag.getAttribute('src') || "";
                if (src.length >= 1) {
                    const words = src.split(`/`);
                    if (words.length >= 2) {
                        localImagePath = words[words.length - 1];
                    }
                }
            }
            //レアリティ
            const colRarity = cols[2];
            const rarityText = colRarity.textContent; //"N","R","R+","SR"
            let rarity = "";
            if (rarityText !== undefined) {
                //"N" 以外対象にする
                if (rarityText === "R" || rarityText === "R+" || rarityText === "SR") {
                    rarity = rarityText;
                }
            }
            //役割(Role)
            const colRole = cols[4];
            const res = new CharParseData();
            res.name = name;
            res.id = id;
            res.rarity = rarity;
            res.imageFileName = localImagePath;
            res.contentURL = hrefPath;
            //console.log(`[${res.imageFileName}]`)
            if (callback !== undefined) {
                validRows++;
                res.nRow = validRows;
                await callback(res);
            }
        }
        console.log(`[parseMemeHtml] ${validRows} valid parsed!`);
        return validRows;
    };
    /**
     * 「2023y06m14d_1713340」といった文字列を
     * UTC基準のシリアル秒（Unix Timestamp）に一発変換する関数（￣ー￣）
     */
    decodeStringToUtcSeconds(str) {
        // 1. 正規表現の釣り竿で、年(y)、月(m)、日(d)の数字をそれぞれ一本釣りする！
        const match = str.match(/(\d{4})y(\d{2})m(\d{2})d/);
        if (!match) {
            // 万が一、形式が違う文字列が来たら、安全弁として現在のタイムスタンプ（秒）を返す
            return Math.floor(Date.now() / 1000);
        }
        const year = parseInt(match[1], 10);
        // ★注意：JavaScriptのDateは「月」だけ0スタート（0=1月、5=6月）なので-1するお利口さん仕様！
        const month = parseInt(match[2], 10) - 1;
        const day = parseInt(match[3], 10);
        // 2. UTC基準でミリ秒のタイムスタンプを算出し、/1000 で「シリアル秒」へと昇華させる！
        const utcMillis = Date.UTC(year, month, day, 0, 0, 0);
        const utcSeconds = Math.floor(utcMillis / 1000);
        return utcSeconds;
    }
    /*
    public parseMemeHtmlDataSrc = async (htmlText: string, callback: (parse: CharParseData) => void) => {
        let match = htmlText.indexOf(`<table class="result_table all-center tableLine">`)
        let tableHtml = ""
        if (match >= 0) {
            tableHtml = htmlText.substring(match)
            const endMark = `</table>`
            match = tableHtml.indexOf(endMark)
            if (match >= 0) {
                tableHtml = tableHtml.substring(0, match + endMark.length)
            }
        }
        if (tableHtml === "")
            return null

        const env = new GameEnv
        const doc = await env.getDoc(tableHtml)

        // tablesorterクラスのテーブルを特定
        const table = doc.querySelector('.result_table.tableLine');
        if (!table) return null;

        let validRows = 0
        const rows = table.querySelectorAll('tr');
        const rowArray = Array.from(rows);
        for (const row of rowArray) {
            const cols = row.querySelectorAll('td');
            if (cols.length < 5) continue;

            //[0]キャラ:id,img,name
            //[1]点数
            //[2]レア
            //[3]職業
            //[4]役割(Role)

            const colCh = cols[0]
            const name = colCh.textContent
            if (name === null) continue;
            //console.log(colCh)
            //キャラID : <a href="https://altema.jp/mememori/chara/3">
            //          <a href="/mememori/rishesu">
            let id = ""
            let hrefPath = "";
            const aTag = colCh.querySelector('a');
            if (aTag) {
                const href = aTag.getAttribute('href') || "";
                if (href.length >= 1) {
                    const words = href.split(`/`)
                    if (words.length >= 4) {
                        id = words[words.length - 1]
                        hrefPath = href
                    }
                    else if (words.length >= 3) {
                        hrefPath = href
                    }
                }
            }
            if (hrefPath !== ``) {
                if (hrefPath.startsWith(`https://altema.jp/mememori`) === false) {
                    hrefPath = `https://altema.jp` + hrefPath
                }
            }
            //画像タグ : <img src="https://img.altema.jp/common/1x1.trans.gif" data-lazy-src="https://img.altema.jp/mememori/chara/icon/114.jpg" alt="ケルベロス(冥)" class="aligncenter iconsize-60">
            const imgTag = colCh.querySelector('img');
            let localImagePath = "";
            if (imgTag) {
                const src = imgTag.getAttribute('data-lazy-src') || "";
                /*
                if (src.length >= 1) {
                    const words = src.split(`/`)
                    if (words.length >= 2) {
                        localImagePath = words[words.length - 1]
                    }
                }
                * /
                localImagePath = src
            }

            //レアリティ
            const colRarity = cols[2]
            const rarityText = colRarity.textContent    //"N","R","R+","SR"
            let rarity = ""
            if (rarityText !== undefined) {
                //"N" 以外対象にする
                if (rarityText === "R" || rarityText === "R+" || rarityText === "SR") {
                    rarity = rarityText
                }
            }

            //役割(Role)
            const colRole = cols[4]

            //キャラIDが未定義？
            if (id === ``) {
                //画像URLのURIをシリアル変換
                const fileParts = localImagePath.split(`/`)
                if (fileParts.length >= 1) {
                    const fileName = fileParts[fileParts.length - 1]
                    const idPart = fileName.split(`.`)
                    if (idPart.length >= 1) {
                        const num = Number(idPart[0])
                        if (!isNaN(Number(num))) {
                            id = `${num}`
                        }
                        else {
                            const serial = this.decodeStringToUtcSeconds(idPart[0])
                            id = `${serial}`
                        }
                    }
                }
            }

            const res = new CharParseData()
            res.name = name
            res.id = id
            res.rarity = rarity
            res.imageFileName = localImagePath
            res.contentURL = hrefPath
            //console.log(`[${res.imageFileName}]`)

            if (callback !== undefined) {
                validRows++
                res.nRow = validRows
                await callback(res)
            }
        }
        
        console.log(`[parseMemeHtml] ${validRows} valid parsed!`)
        return validRows
    }
    */
    /*
    public async saveMemeData(dataBasePath: string) {
        const parseSources = [
            { ns: CharNameSpaceTypes.CnsBlue, nsKey: "01_藍属性", nsName: "藍属性", zipName: "memeMoriBlue.zip" },
            { ns: CharNameSpaceTypes.CnsRed, nsKey: "02_紅属性", nsName: "紅属性", zipName: "memeMoriRed.zip" },
            { ns: CharNameSpaceTypes.CnsGreen, nsKey: "03_翠属性", nsName: "翠属性", zipName: "memeMoriGreen.zip" },
            { ns: CharNameSpaceTypes.CnsYellow, nsKey: "04_黄属性", nsName: "黄属性", zipName: "memeMoriYellow.zip" },
            { ns: CharNameSpaceTypes.CnsWhite, nsKey: "05_天属性", nsName: "天属性", zipName: "memeMoriWhite.zip" },
            { ns: CharNameSpaceTypes.CnsBlack, nsKey: "06_冥属性", nsName: "冥属性", zipName: "memeMoriBlack.zip" },
        ]
        const chListSave = new Array<CharSpecItem>
        const charLoader = new CharLoader
        const toZipInst = await charLoader.createZip()
        this.toImageHome = charLoader.toImageHome

        //load browser zip
        await this.loadBrowserSavedZip(`${dataBasePath}/MemeBrowserSaved.zip`)

        //assin parser
        const parser = charLoader.parseMemeHtml

        //save char zip
        for (const item of parseSources) {
            console.log(`scanning ${item.nsName} ...`)

            const zipBase = `メメントモリ_HTML保存/${item.nsKey}/【メメントモリ】${item.nsName}キャラ一覧【メメモリ】 - アルテマ`
            const parseRes = await this.scanZip(item.ns, zipBase, parser, toZipInst, chListSave)
        }
        const saveZipFile = "memeMori.zip"
        await charLoader.saveZip(toZipInst, saveZipFile)
        console.log(`saved char zip : ${saveZipFile}`)

        //save char json
        const saveJsonFile = "memeMori.json"
        const chSpecList = new CharSpecSet
        chSpecList.chList = chListSave
        const env = new GameEnv
        await env.saveJson(saveJsonFile, chSpecList.chList)
        console.log(`saved char json : ${saveJsonFile}`)
    }
    */
    async parseMemeInfoHtml(htmlText, callback) {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        //ステータス用パーサ
        function doParseStatusInfo(rowArray, hContent) {
            let matchRule = null;
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th');
                if (ths.length < 1)
                    continue;
                const key = ths[0].textContent;
                if (key === null)
                    continue;
                const match = findRule(key, hContent);
                if (match) {
                    matchRule = match;
                }
                else
                    continue;
                const cols = row.querySelectorAll('td');
                if (cols.length < 1)
                    continue;
                const colStatus = cols[0];
                let status = colStatus.textContent;
                status = status !== null ? status.replace(/\n/g, ``).trim() : ``;
                if (CharParseDebug.debug)
                    console.log(`[doParseStatusInfo] found "ステータス"::${matchRule.find} [${status}]`);
                if (matchRule) {
                    matchRule.value = status;
                }
            }
        }
        //ロール用パーサ
        function doParseEvalInfo(rowArray, hContent) {
            let thsList = null;
            let tdsList = null;
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th');
                const tds = row.querySelectorAll('td');
                if (ths.length >= 1) {
                    thsList = ths;
                }
                if (tds.length >= 1) {
                    tdsList = tds;
                }
            }
            if (thsList !== null && tdsList !== null) {
                for (let index = 0; index < thsList.length; index++) {
                    const key = thsList[index].textContent;
                    if (key === null)
                        continue;
                    const match = findRule(key, hContent);
                    if (match) {
                        const matchRule = match;
                        const colIndex = index;
                        if (tdsList.length >= 1 && colIndex >= 0) {
                            const colStatus = tdsList[colIndex];
                            let status = colStatus.textContent;
                            status = status !== null ? status.replace(/\n/g, ``) : ``;
                            if (CharParseDebug.debug)
                                console.log(`[doParseEvalInfo] found "${hContent}"::${matchRule.find} [${status}]`);
                            if (matchRule) {
                                matchRule.value = status;
                            }
                        }
                    }
                }
            }
        }
        //アクティブスキル・パッシブスキル用パーサ
        function doParseSkillInfo(rowArray, hContent) {
            let skillAll = ``;
            for (const row of rowArray) {
                const tds = row.querySelectorAll('td');
                let colIndex = -1;
                let skillName = ``;
                let skillAbility = ``;
                for (const td of tds) {
                    colIndex++;
                    if (colIndex === 0) {
                        skillName = toPlainText(td);
                    }
                    else {
                        for (const node of td.childNodes) {
                            let content = ``;
                            if (node.nodeType === 3 /*Node.TEXT_NODE*/) {
                                // テキスト内の \n (改行コード) や余計な空白を削除・整理
                                if (node.textContent !== null) {
                                    content = node.textContent.replace(/\s+/g, '');
                                }
                            }
                            else if (node.nodeType === 1 /*Node.ELEMENT_NODE*/) {
                                if (node.nodeName === 'BR') {
                                    content = "<br>";
                                }
                                else if (node.nodeName === 'HR') {
                                    //hrは無視
                                }
                                else if (node.textContent !== null) {
                                    content = node.textContent.replace(/\s+/g, '');
                                }
                            }
                            if (content === ``)
                                continue;
                            if (skillAbility !== ``)
                                skillAbility += `<br>`;
                            skillAbility += content;
                        }
                    }
                }
                console.log(skillName, skillAbility);
                if (skillName !== `` && skillAbility !== ``) {
                    if (skillAll !== ``)
                        skillAll += `<br>`;
                    skillAll += skillName + `=` + skillAbility;
                }
            }
            if (skillAll !== ``) {
                const rule = findRule(hContent, ``);
                if (rule !== null) {
                    rule.value = skillAll;
                }
            }
        }
        //専用武器スキル用パーサ
        function doParseWeaponNameInfo(rowArray, hContent) {
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th');
                const tds = row.querySelectorAll('td');
                let skillName = ``;
                let skillAbility = ``;
                if (ths.length === 1) {
                    skillName = toPlainText(ths[0]);
                }
                if (tds.length === 1) {
                    skillAbility = toPlainText(tds[0]);
                }
                if (skillName !== `` && skillAbility !== ``) {
                    const skillAll = skillName + `=` + skillAbility;
                    const rule = findRule(hContent, ``);
                    if (rule !== null) {
                        rule.value = skillAll;
                    }
                    break;
                }
            }
        }
        //専用スキル効果用パーサ
        function doParseWeaponSkillInfo(rowArray, hContent) {
            let skillAll = ``;
            let rowIndex = -1;
            for (const row of rowArray) {
                rowIndex++;
                const ths = row.querySelectorAll('th');
                const tds = row.querySelectorAll('td');
                let skillName = ``;
                let skillAbility = ``;
                if (ths.length >= 2) {
                    if (rowIndex === 0)
                        skillName = toPlainText(ths[1]);
                    if (skillAll !== ``)
                        skillAll += `<br>`;
                    skillAll += skillName;
                }
                if (tds.length === 1) {
                    skillAbility = toPlainText(tds[0]);
                    if (skillAbility !== ``) {
                        if (skillAll !== ``) {
                            if (rowIndex === 1)
                                skillAll += `=`;
                            else
                                skillAll += `<br>`;
                        }
                        skillAll += skillAbility;
                    }
                }
            }
            if (skillAll !== ``) {
                const rule = findRule(hContent, ``);
                if (rule !== null) {
                    rule.value = skillAll;
                }
            }
        }
        //専用パッシブ効果用パーサ
        function doParseWeaponPassiveInfo(rowArray, hContent) {
            let skillAll = ``;
            let rowIndex = -1;
            for (const row of rowArray) {
                rowIndex++;
                const ths = row.querySelectorAll('th');
                const tds = row.querySelectorAll('td');
                let skillName = ``;
                let skillAbility = ``;
                if (rowIndex === 0) {
                    if (ths.length >= 2)
                        skillName = toPlainText(ths[1]);
                }
                else {
                    if (ths.length >= 1)
                        skillName = toPlainText(ths[0]);
                }
                if (tds.length === 1) {
                    skillAbility = toPlainText(tds[0]);
                }
                if (rowIndex === 0) {
                    if (skillName !== ``) {
                        if (skillAll !== ``)
                            skillAll += `<br>`;
                        skillAll += skillName;
                    }
                }
                else {
                    if (skillName !== `` && skillAbility !== ``) {
                        if (skillAll !== ``) {
                            if (rowIndex === 1)
                                skillAll += `=`;
                            else
                                skillAll += `<br>`;
                        }
                        skillAll += skillName + `：` + skillAbility;
                    }
                }
            }
            if (skillAll !== ``) {
                const rule = findRule(hContent, ``);
                if (rule !== null) {
                    rule.value = skillAll;
                }
            }
        }
        //パーサ選択
        function doParse(hSelector) {
            const headers = doc.querySelectorAll(hSelector);
            for (const hElem of headers) {
                const patternId = hElem.getAttribute('id') || "";
                const headerText = hElem.textContent !== null ? hElem.textContent.trim() : ``;
                if (CharParseDebug.debug)
                    console.log(`${hSelector}::${patternId}::${headerText}`);
                let hContent = ``;
                let infoParser = null;
                let rowArray = null;
                let nextEl = hElem.nextElementSibling;
                while (nextEl) {
                    const tagName = nextEl.tagName;
                    if (tagName === `TABLE`) {
                        if (hElem.tagName === `H3`) {
                            //スキル関連？
                            if (headerText.includes('アクティブスキル')) {
                                console.log(`assume doParseActiveSkillInfo`);
                                hContent = headerText;
                                infoParser = doParseSkillInfo;
                            }
                            else if (headerText.includes('パッシブスキル')) {
                                console.log(`assume doParsePassiveSkillInfo`);
                                hContent = headerText;
                                infoParser = doParseSkillInfo;
                            }
                            else if (headerText.includes('専用スキル効果')) {
                                console.log(`assume doParseUniqueSkillInfo`);
                                hContent = `専用スキル効果`;
                                infoParser = doParseWeaponSkillInfo;
                            }
                            else if (headerText.includes('専用パッシブ効果')) {
                                console.log(`assume doParseExclusivePassiveSkillInfo`);
                                hContent = `専用パッシブ効果`;
                                infoParser = doParseWeaponPassiveInfo;
                            }
                            if (infoParser !== null) {
                                const table = nextEl;
                                const rows = table.querySelectorAll('tr');
                                rowArray = Array.from(rows);
                                if (rowArray.length >= 1)
                                    break;
                            }
                        }
                        else if (hElem.tagName === `H2`) {
                            if (headerText.includes('専用武器スキル')) {
                                console.log(`assume doParseSignatureWeaponSkillInfo`);
                                hContent = `専用武器スキル`;
                                infoParser = doParseWeaponNameInfo;
                            }
                            if (infoParser !== null) {
                                const table = nextEl;
                                const rows = table.querySelectorAll('tr');
                                rowArray = Array.from(rows);
                                if (rowArray.length >= 1)
                                    break;
                            }
                        }
                        const title = nextEl.textContent !== null ? nextEl.textContent.trim() : ``;
                        if (title.includes('戦闘力') && title.includes('攻撃力') &&
                            title.includes('物理防御力') && title.includes('命中') &&
                            title.includes('回避') && title.includes('クリティカル') &&
                            title.includes('魔法防御力') && title.includes('HP') &&
                            title.includes('クリティカル耐性') && title.includes('防御力') &&
                            title.includes('スピード')) {
                            if (headerText.includes(`ステータス`)) {
                                hContent = 'ステータス';
                                infoParser = doParseStatusInfo;
                                //console.log(`assume doParseStatusInfo`)
                            }
                        }
                        else if (title.includes('技力') && title.includes('魔力') &&
                            title.includes('耐久力')) {
                            if (headerText === `潜在能力`) {
                                hContent = '潜在能力';
                                infoParser = doParseStatusInfo;
                                //console.log(`assume doParseStatusInfo`)
                            }
                        }
                        else if (title.includes('役割')) {
                            if (headerText.includes(`評価と性能`) ||
                                headerText.includes(`評価と基本情報`)) {
                                hContent = '評価と性能';
                                infoParser = doParseEvalInfo;
                                //console.log(`assume doParseEvalInfo`)
                            }
                        }
                        if (infoParser !== null) {
                            const table = nextEl;
                            const rows = table.querySelectorAll('tr');
                            rowArray = Array.from(rows);
                            if (rowArray.length >= 1)
                                break;
                        }
                    }
                    nextEl = nextEl.nextElementSibling;
                }
                if (rowArray === null)
                    continue;
                if (infoParser === null)
                    continue;
                infoParser(rowArray, hContent);
            }
        }
        const parseRules = [
            { hContent: `ステータス`, find: `戦闘力`, key: `mmStatusFGT`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `攻撃力`, key: `mmStatusATK`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `物理防御力`, key: `mmStatusPDF`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `命中`, key: `mmStatusACC`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `回避`, key: `mmStatusEVA`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `クリティカル`, key: `mmStatusCRI`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `魔法防御力`, key: `mmStatusMDF`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `HP`, key: `mmStatusHP`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `クリティカル耐性`, key: `mmStatusCRD`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `防御力`, key: `mmStatusDEF`, value: ``, need: true, useCombo: false },
            { hContent: `ステータス`, find: `スピード`, key: `mmStatusSPD`, value: ``, need: true, useCombo: false },
            { hContent: `潜在能力`, find: `技力`, key: `mmAbilityDEX`, value: ``, need: false, useCombo: false },
            { hContent: `潜在能力`, find: `魔力`, key: `mmAbilityMGC`, value: ``, need: false, useCombo: false },
            { hContent: `潜在能力`, find: `耐久力`, key: `mmAbilityDUR`, value: ``, need: false, useCombo: false },
            { hContent: `評価と性能`, find: `役割`, key: `mmRole`, value: ``, need: true, useCombo: true },
            { hContent: ``, find: `アクティブスキル`, key: `mmSkillA`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `パッシブスキル`, key: `mmSkillP`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `専用武器スキル`, key: `mmSkillSw`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `専用スキル効果`, key: `mmSkillUe`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `専用パッシブ効果`, key: `mmSkillEpe`, value: ``, need: false, useCombo: false },
        ];
        function findRule(findText, hContent) {
            const match = parseRules.find(item => item.find === findText && item.hContent === hContent);
            if (match)
                return match;
            return null;
        }
        doParse('h2');
        doParse('h3');
        let nEmpty = 0;
        parseRules.forEach(rule => { if (rule.need && rule.value === ``)
            nEmpty++; });
        if (nEmpty >= 1) {
            console.log(`cannot info parsed !`);
            parseRules.forEach(rule => { if (rule.need && rule.value === ``)
                console.log(`empty [${rule.find}]`); });
        }
        else {
            if (callback)
                callback(parseRules);
            return true;
        }
        return false;
    }
    /*
    public parseHouchiHtml = async (htmlText: string, callback: (parse: CharParseData) => void) => {
        const env = new GameEnv
        const doc = await env.getDoc(htmlText)

        let validRows = 0
        const headers = doc.querySelectorAll('h3.a-header--3')
        for (const h3 of headers) {
            const rarityId = h3.getAttribute('id') || "";
            //const rarityName = h3.textContent.trim()
            //console.log(`${rarityId}, ${rarityName}`)

            let rowArray = null
            let nextEl = h3.nextElementSibling
            while (nextEl) {
                const tagName = nextEl.tagName

                if (tagName === `P`) {
                    console.log(`[${tagName}] ${rarityId} nothing char info`)
                    break
                }
                if (tagName === `TABLE`) {
                    //console.log(`[${tagName}]`)
                    const table = nextEl
                    const rows = table.querySelectorAll('tr');
                    rowArray = Array.from(rows);
                    if (rowArray.length >= 1)
                    {
                        console.log(`[${tagName}] found char info`)
                        break
                    }
                }

                nextEl = nextEl.nextElementSibling;
            }

            if (rowArray === null)  continue
            
            for (const row of rowArray) {
                const cols = row.querySelectorAll('td');
                if (cols.length < 1) continue;

                const colCh = cols[0]
                //console.log(colCh)
                const name = colCh.textContent
                if (name === null) continue

                //キャラID : https://game8.jp/houchishoujo/748309"
                let id = ""
                let hrefPath = "";
                const aTag = colCh.querySelector('a');
                if (aTag) {
                    const href = aTag.getAttribute('href') || "";
                    if (href.length >= 1) {
                        const words = href.split(`/`)
                        if (words.length >= 4) {
                            id = words[words.length - 1]
                            hrefPath = href
                        }
                    }
                }

                const imgTag = colCh.querySelector('img');
                let localImagePath = "";

                if (imgTag) {
                    // 2. src属性から "./.../show(5)" のような文字列を取得
                    const src = imgTag.getAttribute('src') || "";
                    
                    // 3. 正規表現やsplitで "show(数字)" の部分だけ抜き出す
                    const match = src.match(/show\(\d+\)/);
                    if (match) {
                        // "show(5).png" のように拡張子を補完して管理する
                        localImagePath = match[0];
                    }
                }

                const res = new CharParseData()
                res.name = name
                res.id = id
                res.rarity = rarityId
                res.imageFileName = localImagePath
                res.contentURL = hrefPath
                //console.log(`[${res.imageFileName}]`)

                if (callback !== undefined) {
                    validRows++
                    res.nRow = validRows
                    await callback(res)
                }
            }
        }
       
        console.log(`[parseHouchiHtml] ${validRows} valid parsed!`)
        return validRows
    }

    public async saveHouchiData(dataBasePath: string) {
        const parseSources = [
            { ns: CharNameSpaceTypes.CnsRed, nsKey: "01_魏", nsName: "魏" },
            { ns: CharNameSpaceTypes.CnsBlue, nsKey: "02_蜀", nsName: "蜀" },
            { ns: CharNameSpaceTypes.CnsGreen, nsKey: "03_呉", nsName: "呉" },
            { ns: CharNameSpaceTypes.CnsYellow, nsKey: "04_群", nsName: "群" },
            { ns: CharNameSpaceTypes.CnsViolet, nsKey: "05_華", nsName: "華" },
            { ns: CharNameSpaceTypes.CnsViolet, nsKey: "06_和", nsName: "和" },
            { ns: CharNameSpaceTypes.CnsViolet, nsKey: "07_洋", nsName: "洋" },
        ]
        const chListSave = new Array<CharSpecItem>
        const charLoader = new CharLoader
        const toZipInst = await charLoader.createZip()
        this.toImageHome = charLoader.toImageHome

        //load browser zip
        await this.loadBrowserSavedZip(`${dataBasePath}/HouchiBrowserSaved.zip`)

        //assin parser
        const parser = charLoader.parseHouchiHtml

        //save char zip
        for (const item of parseSources) {
            console.log(`scanning ${item.nsName} ...`)

            const zipBase = `放置少女_HTML保存/${item.nsKey}/【放置少女】${item.nsName}陣営の副将一覧｜ゲームエイト`
            const parseRes = await this.scanZip(item.ns, zipBase, parser, toZipInst, chListSave)
        }
        const saveZipFile = "HouchiSyoujo.zip"
        await charLoader.saveZip(toZipInst, saveZipFile)
        console.log(`saved char zip : ${saveZipFile}`)

        //save char json
        const saveJsonFile = "HouchiSyoujo.json"
        const chSpecList = new CharSpecSet
        chSpecList.chList = chListSave
        const env = new GameEnv
        await env.saveJson(saveJsonFile, chSpecList.chList)
        console.log(`saved char json : ${saveJsonFile}`)
    }
    */
    async scanZip(ns, zipBase, parser, toZipInst, chListSave) {
        const zipHtmlFile = `${zipBase}.html`;
        const zipImgDir = `${zipBase}_files`;
        const htmlText = await this.getHtmlFromZip(zipHtmlFile);
        //console.log(htmlText)
        let validRows = 0;
        const parseRes = await parser(htmlText, async (chParseData) => {
            validRows = chParseData.nRow;
            const ch = new CharSpecItem;
            //ch.id = parseInt(chParseData.id)
            ch.name = chParseData.name;
            ch.ns = ns;
            ch.idAsText = chParseData.id;
            ch.contentURL = chParseData.contentURL;
            chListSave.push(ch);
            await this.appendZip(zipImgDir, chParseData, toZipInst);
            //console.log(`stocked ${chParseData.name}`)
        });
        if (validRows !== parseRes) {
            console.log(`[scanZip] invalid rows : ${zipBase}`);
        }
        else {
            console.log(`[scanZip] ${validRows} valid parsed!`);
        }
        return parseRes;
    }
    async createZip() {
        const env = new GameEnv;
        this.toImageHome = env.imageHome.substring(2); // "./"を取り除く
        if (env.isWebRunning) {
            const zip = new window.JSZip();
            return zip;
        }
        else {
            const { createZipNode } = await import(env.nodeToolsImportFilename);
            const zip = createZipNode();
            return zip;
        }
    }
    async saveZip(toZip, fileName) {
        const env = new GameEnv;
        if (env.isWebRunning) {
            const content = await toZip.generateAsync({ type: "blob" });
            // 3. ダウンロード用のリンクを作ってクリックさせる
            const url = URL.createObjectURL(content);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            // メモリ解放
            await new Promise(res => setTimeout(res, 300));
            URL.revokeObjectURL(url);
        }
        else {
            const content = await toZip.generateAsync({ type: "nodebuffer" });
            const { saveZipNode } = await import(env.nodeToolsImportFilename);
            saveZipNode(fileName, content);
        }
    }
    async appendArrayZip(imgDir, chData, toZip) {
        if (chData === null)
            return;
        //this.zip.forEach((path: any) => console.log(`[Inside ZIP]: "${path}"`));
        for (const item of chData) {
            if (item === null)
                continue;
            if (item.name === null)
                continue;
            if (item.id === null)
                continue;
            if (item.imageFileName === null || item.imageFileName === "")
                continue;
            if (item.rarity === null || item.rarity === "")
                continue;
            const srcImg = `${imgDir}/${item.imageFileName}`;
            console.log(srcImg);
            const file = this.zip.file(srcImg);
            if (!file) {
                console.log(`not exist [${file}]`);
                continue;
            }
            const blob = await file.async("ArrayBuffer");
            //console.log(`exist blob [${blob}]`)
            const pngFileName = `${this.toImageHome}${item.name}_${item.id}${this.toImageExt}`;
            //console.log(`to save [${pngFileName}]`)
            toZip.file(pngFileName, blob);
        }
    }
    async appendZip(imgDir, chData, toZip) {
        if (chData === null)
            return;
        if (chData.name === null)
            return;
        if (chData.id === null)
            return;
        if (chData.imageFileName === null || chData.imageFileName === "")
            return;
        if (chData.rarity === null || chData.rarity === "")
            return;
        const srcImg = `${imgDir}/${chData.imageFileName}`;
        //console.log(srcImg)
        const file = this.zip.file(srcImg);
        if (!file) {
            console.log(`not exist [${file}]`);
            return;
        }
        const blob = await file.async("ArrayBuffer");
        //console.log(`exist blob [${blob}]`)
        const imgFileName = `${this.toImageHome}${chData.name}_${chData.id}${this.toImageExt}`;
        console.log(`to save [${imgFileName}]`);
        toZip.file(imgFileName, blob);
    }
    downloadJson(data, filename) {
        // 1. JSON文字列に変換
        const jsonStr = JSON.stringify(data, null, 2);
        // 2. Blobを作成
        const blob = new Blob([jsonStr], { type: 'application/json' });
        // 3. ダウンロード用のURLを生成
        const url = URL.createObjectURL(blob);
        // 4. ダミーの<a>タグを作成してクリック
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        // 5. 後始末
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    downloadText(text, filename) {
        // 2. Blobを作成
        const blob = new Blob([text], { type: 'application/json' });
        // 3. ダウンロード用のURLを生成
        const url = URL.createObjectURL(blob);
        // 4. ダミーの<a>タグを作成してクリック
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        // 5. 後始末
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
//# sourceMappingURL=CharLoader.js.map