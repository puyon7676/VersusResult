import { EvonaActions } from "./GameEnv.js";
import { HtmlMaker } from "./HtmlMaker.js";
import { HtmlMakerCommonCss, HtmlMakerMisc } from "./HtmlMaker.js";
import { HtmlMakerOptionInput } from "./HtmlMaker.js";
import { HtmlMakerChoiceItem, HtmlMakerChoice, HtmlMakerChoiceTwinModes, HtmlMakerChoiceHeaderModes } from "./HtmlMaker.js";
import { HtmlMakerTable } from "./HtmlMaker.js";
import { HtmlMakerToolTipMgr, HtmlMakerToolTipCloseTypes, HtmlMakerToolTipMgrTypes } from "./HtmlMaker.js";
import { HtmlMakerCanvasTool } from "./HtmlMaker.js";
import { EvonaMessageBox, MessageBoxResultTypes } from "./MessageBox.js";
import { DragDropHelper } from "./HtmlMaker.js";
import { FileSelect } from "./HtmlMaker.js";
import { HtmlMakerUpDown, HtmlMakerUpDownDirTypes, HtmlMakerTimeSelect } from "./HtmlMaker.js";
import { ClipboardHelper } from "./ClipboardHelper.js";
import { ElectronTools } from "./ServerTools.js";
import { ytInfos, ytInfo, isYtUrlPrefix, isYtUrlShortPrefix, convYtUrlPrefix, convYtUrlShortPrefix } from "./YoutubeInfos.js";
export class VideoPlay {
    //ローカル動画再生（videoタグ）
    isAvailVideoFiles(files) {
        let isOk = false;
        for (const file of files) {
            if (file.type === `video/mp4`)
                return true;
            if (file.type === `audio/mpeg`)
                return true;
        }
        return isOk;
    }
    onVideoLoadedMetadata = async (event) => {
        console.log(`**onVideoLoadedMetadata**`, event);
    };
    onCanPlay = async (event) => {
        console.log(`**onCanPlay**`, event);
    };
    onCanPlayThrough = async (event) => {
        console.log(`**onCanPlayThrough**`, event);
        this.isSeekEnd = false;
    };
    onPause = async (event) => {
        console.log(`**onPause**`, event);
        const videoElem = event.target;
        const pauseTime = videoElem.currentTime;
        const duration = videoElem.duration;
        console.log(`**onPause**`, pauseTime, duration);
        if (pauseTime === duration)
            return; //最後まで再生してポーズした場合は、NOP
        if (this.isSeekEnd) {
            this.isSeekEnd = false;
            return;
        }
        if (this.isNeedPauseToSeek === true) {
            this.endPauseToSeek();
        }
        let isDl = this.isPinP;
        if (!this.isPinP) {
            const res = await ClipboardHelper.put(`${this.videoFile}\t${pauseTime}`);
            isDl = !res;
        }
        if (isDl) {
            const pauseInfo = `${this.videoFile}\t${pauseTime}`;
            this.downloadVideoInfoFile(`pauseInfo.txt`, pauseInfo);
        }
    };
    onVideoEnded = async (event) => {
        await this.playNext();
    };
    onEnterPictureInPicture = async (event) => {
        this.isPinP = true;
    };
    onLeavePictureInPicture = async (event) => {
        this.isPinP = false;
    };
    onSeeking = async (event) => {
        //console.log(`**onSeeking**`, event)
    };
    onSeeked = async (event) => {
        console.log(`**onSeeked**`, event);
        this.isSeekEnd = true;
    };
    onVideoError = async (event) => {
        console.log(`**onVideoError**`, event);
    };
    setSrc(file) {
        this.videoFile = file.name;
        const url = URL.createObjectURL(file);
        this.videoElem.src = url;
        this.videoFullPath = ElectronTools.getFullPath(file) || ``;
        this.repeatMap.set(file, url);
    }
    revokeSrc() {
        const urls = this.repeatMap.entries();
        let existFile = null;
        for (const [file, url] of urls) {
            if (file.name === this.videoFile) {
                URL.revokeObjectURL(url);
                existFile = file;
                break;
            }
        }
        return existFile;
    }
    shuffle() {
        this.playList.sort(() => Math.random() - 0.5);
    }
    async playNext() {
        this.resetVideoEdit();
        const existFile = this.revokeSrc();
        if (this.playList.length === 0 && !this.canRepaet) {
            this.videoFile = ``;
            return;
        }
        const videoInfo = this.playList[0];
        this.playList.splice(0, 1);
        this.setSrc(videoInfo);
        await this.videoElem.play();
        this.shuffle();
        if (this.canRepaet) {
            if (existFile !== null)
                this.playList.push(existFile);
            else {
                console.log(`**bug!!**`);
            }
        }
        if (this.playListCtl !== null) {
            const texts = new Array;
            texts.push(`${this.videoFile} ${this.currentPlayMark}`);
            this.playList.forEach(file => texts.push(this.fileToPlayDispText(file)));
            this.playListCtl.UpdateItems(texts);
        }
    }
    downloadVideoInfoFile(filename, content) {
        //const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
        const blob = new Blob([content], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    fileToPlayDispText(file) {
        let name = file.name;
        if (name.endsWith(`.mp3`)) {
            name = name.substring(0, name.length - 4);
        }
        if (name.endsWith(`.mp4`)) {
            name = name.substring(0, name.length - 4);
        }
        return `${name} [${file.type}]`;
    }
    videoDropVideoCssClassName() {
        return `evonaVideo-drop`;
    }
    canRepaet = true;
    isPinP = false;
    isSeekEnd = false;
    videoFile = ``;
    videoFullPath = ``;
    playList = new Array;
    repeatMap = new Map;
    videoCssName = ``;
    videoElem;
    isNeedPauseToSeek = false; //一時停止要求を出して一時停止した後にシーク実行するか
    pauseToSeekTo = 0; //一時停止要求を出して一時停止した後にシークする位置
    pauseToSeekOfs = 0; //一時停止要求を出して一時停止した後にシークする位置±オフセット(×1000)
    setupVideoElem() {
        this.videoCssName = this.videoDropVideoCssClassName();
        const videoElem = document.createElement(`video`);
        videoElem.className = this.videoCssName;
        videoElem.id = this.videoCssName;
        videoElem.style.display = `none`;
        videoElem.style.width = `98vw`; //`100vw`
        videoElem.style.height = `98vh`; //`100vh`
        //videoElem.width = 100
        //videoElem.height = 100
        //videoElem.autoplay = true
        videoElem.controls = true;
        videoElem.addEventListener(`loadedmetadata`, this.onVideoLoadedMetadata);
        videoElem.addEventListener(`canplay`, this.onCanPlay);
        videoElem.addEventListener(`canplaythrough`, this.onCanPlayThrough);
        videoElem.addEventListener(`pause`, this.onPause);
        videoElem.addEventListener(`ended`, this.onVideoEnded);
        videoElem.addEventListener(`enterpictureinpicture`, this.onEnterPictureInPicture);
        videoElem.addEventListener(`leavepictureinpicture`, this.onLeavePictureInPicture);
        videoElem.addEventListener(`seeking`, this.onSeeking);
        videoElem.addEventListener(`seeked`, this.onSeeked);
        videoElem.addEventListener(`error`, this.onVideoError);
        document.body.appendChild(videoElem);
        this.videoElem = videoElem;
    }
    startPauseToSeek(seekTo, seekOfs) {
        if (this.videoElem.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
            console.log(`**startPauseToSeek**`, `cannot play`);
            return;
        }
        if (this.isNeedPauseToSeek === true) {
            console.log(`**startPauseToSeek**`, `already started`);
            return;
        }
        const pauseTime = this.videoElem.currentTime;
        const duration = this.videoElem.duration;
        let wantTime = (seekTo * 1000 + seekOfs) / 1000;
        if (seekTo < 0) {
            console.log(`**startPauseToSeek**`, `invalid seekTo params`);
            return;
        }
        if (wantTime < 0) {
            console.log(`**startPauseToSeek**`, `adjust wantTime start-time`);
            wantTime = 0;
        }
        if (wantTime > duration) {
            console.log(`**startPauseToSeek**`, `adjust wantTime end-time`);
            wantTime = duration;
        }
        if (!this.videoElem.paused) {
            this.isNeedPauseToSeek = true;
            this.pauseToSeekTo = seekTo;
            this.pauseToSeekOfs = seekOfs;
            this.videoElem.pause();
            console.log(`**startPauseToSeek**`, `pause start!! -> ${wantTime}`);
        }
        else {
            this.videoElem.currentTime = wantTime;
        }
    }
    endPauseToSeek() {
        if (this.isNeedPauseToSeek === true) {
            const wantTime = (this.pauseToSeekTo * 1000 + this.pauseToSeekOfs) / 1000;
            this.videoElem.currentTime = wantTime;
            console.log(`**endPauseToSeek**`, `pause to seeked!! -> ${wantTime}`);
        }
        this.isNeedPauseToSeek = false;
        this.pauseToSeekTo = 0;
        this.pauseToSeekOfs = 0;
    }
    env;
    dockUI;
    drogdrop = new DragDropHelper();
    fsHtmlMaker = new HtmlMaker;
    splashName = `splash-screen`;
    setup(env, dockUI) {
        this.env = env;
        this.dockUI = dockUI;
        this.setupVideoElem();
        this.setupYtPlayer();
        this.dockUI.videoPlay = this.videoElem;
        this.drogdrop.onDropFiles = this.doDropVideoFiles;
        this.drogdrop.Start(this.videoCssName);
    }
    doDropVideoFiles = async (elem, files) => {
        if (this.isAvailVideoFiles(files) === false)
            return;
        if (ElectronTools.isInElectron) {
            const pathMap = ElectronTools.getFullPathMap(files);
            console.log(pathMap);
        }
        let isFirstPlay = this.playList.length === 0 && this.videoFile === ``;
        let isFirstMsg = true;
        if (!isFirstPlay) {
            const parentClassName = this.videoElem.className;
            const msgbox = new EvonaMessageBox;
            msgbox.setParent(parentClassName);
            msgbox.setYesNo();
            const res = await msgbox.showWait(`再生リストを空にして追加しますか？`);
            if (res === MessageBoxResultTypes.Yes) {
                this.playList.splice(0, this.playList.length);
                isFirstPlay = true;
                isFirstMsg = false;
            }
        }
        for (let iList = 0; iList < files.length; iList++) {
            const file = files[iList];
            let isOk = false;
            if (file.type === `video/mp4`)
                isOk = true;
            else if (file.type === `audio/mpeg`)
                isOk = true;
            if (!isOk)
                continue;
            this.playList.push(file);
        }
        this.shuffle();
        const file = this.playList[0];
        if (isFirstPlay) {
            this.videoFile = file.name;
            let currentTime = 0;
            if (isFirstMsg) {
                await ClipboardHelper.put(`${this.videoFile}`);
                const parentClassName = this.videoElem.className;
                const msgbox = new EvonaMessageBox;
                msgbox.setParent(parentClassName);
                let res = MessageBoxResultTypes.None;
                res = await msgbox.showWait(`${this.videoFile}<br>ファイル名を検索して続きの時間をコピーすると再開します`);
                let currentTimeText = await ClipboardHelper.get() || `0`;
                const currentTimeArray = currentTimeText.split(`\t`);
                currentTimeText = currentTimeArray[currentTimeArray?.length - 1];
                currentTime = isNaN(Number(currentTimeText)) ? 0 : Number(currentTimeText);
            }
            this.setSrc(file);
            this.videoElem.currentTime = currentTime;
            await this.videoElem.play();
            this.playList.splice(0, 1);
        }
        this.setPlayListItems = this.setVideoPlayListItems;
        if (this.playListCtl !== null) {
            //表示中なら内容を更新
            this.makePlayListCtl();
        }
    };
    //ここから共通部分
    isInElectron = ElectronTools.isInElectron;
    videoToolTip = null; //ローカル動画再生
    videoEditToolTip = null; //ローカル動画編集
    playEditToolTip = null; //プレイリスト編集
    playListCtl = null; //プレイリスト表示
    currentPlayMark = `🎦`;
    getPausedCurrentTime() {
        if (this.dockUI.selectedPlayer === this.videoElem) {
            if (this.videoElem.src.length === 0)
                return -1;
            if (this.videoElem.paused)
                return this.videoElem.currentTime;
        }
        else {
            const state = this.ytPlayer.getPlayerState();
            switch (state) {
                case 1: //再生中
                    return -1;
                case 2: //一時停止
                    const pauseTime = this.ytPlayer.getCurrentTime();
                    return pauseTime;
            }
        }
        return -1;
    }
    getDuration() {
        if (this.dockUI.selectedPlayer === this.videoElem) {
            return this.videoElem.duration;
        }
        else {
            const duration = this.ytPlayer.getDuration();
            return duration;
        }
        return -1;
    }
    isInDuration(timeText, aDuration) {
        const timeArray = timeText.split(`:`);
        const seconds = Number(timeArray[0]) * 3600 + Number(timeArray[1]) * 60 + Number(timeArray[2]);
        if (seconds < aDuration)
            return seconds;
        return -1;
    }
    setCurrentTime(seconds) {
        if (this.dockUI.selectedPlayer === this.videoElem) {
            this.videoElem.currentTime = seconds;
        }
        else {
            this.ytPlayer.seekTo(seconds, true); //操作していない前提
        }
    }
    //ここから再生時間選択
    timeSelectCtl = null; //再生時間選択
    makeTimeSelectCtl() {
        const dlg = this.videoToolTip.dlg;
        const tsCtl = new HtmlMakerTimeSelect();
        tsCtl.setInit(0);
        const parentName = dlg.id;
        tsCtl.setListener(`${parentName}-timeSelect`, parentName, `${parentName}-timeSelect`);
        tsCtl.enableOverlay(false);
        tsCtl.applyCss();
        tsCtl.show(`0`, `0`);
        tsCtl.enableEvents(
        /*onUpAction*/
        async (ev) => {
            //console.log(`[onUpAction] ${ev.callerName} ${ev.result}`)
            if (this.getPausedCurrentTime() === -1)
                ev.cancel = true;
            const seconds = this.isInDuration(ev.result, this.getDuration());
            if (seconds === -1)
                ev.cancel = true;
            if (!ev.cancel)
                this.setCurrentTime(seconds);
        }, 
        /*onDnAction*/
        async (ev) => {
            //console.log(`[onDnAction] ${ev.callerName} ${ev.result}`)
            if (this.getPausedCurrentTime() === -1)
                ev.cancel = true;
            const seconds = this.isInDuration(ev.result, this.getDuration());
            if (seconds === -1)
                ev.cancel = true;
            if (!ev.cancel)
                this.setCurrentTime(seconds);
        });
        this.timeSelectCtl = tsCtl;
        this.timeSelectCtl.setVisible(false);
    }
    //ここからプレイリスト表示
    setPlayListItems;
    setVideoPlayListItems(choiceItems) {
        let playIndex = 0;
        if (this.videoFile !== ``) {
            const itemPlay = new HtmlMakerChoiceItem();
            itemPlay.key = `playListCtl-${playIndex}`;
            itemPlay.text = `${this.videoFile} ${this.currentPlayMark}`;
            choiceItems.push(itemPlay);
        }
        for (const file of this.playList) {
            playIndex++;
            const itemMedia = new HtmlMakerChoiceItem();
            itemMedia.key = `playListCtl-${playIndex}`;
            itemMedia.text = this.fileToPlayDispText(file);
            choiceItems.push(itemMedia);
        }
    }
    makePlayListCtl() {
        const dlg = this.videoToolTip.dlg;
        const btn = this.videoListButton;
        //const btn: HTMLButtonElement = dockUI.selectedPlayer === videoElem ? optListButton! : optNextButton!
        if (this.playListCtl !== null) {
            this.playListCtl.dispose();
            if (btn !== null) {
                const htmlMaker = new HtmlMaker();
                htmlMaker.EnableElem(btn, true);
            }
        }
        const choiceItems = new Array;
        if (this.setPlayListItems !== undefined)
            this.setPlayListItems(choiceItems);
        const choice = new HtmlMakerChoice();
        choice.itemWordWrap = true;
        choice.itemWidth = 200;
        choice.twinText = `❌`;
        choice.setChoiceItems(choiceItems, HtmlMakerChoiceTwinModes.VisLast);
        choice.headerTitle = `プレイリスト`;
        choice.onCancel = this.onVideoListButtonCancel;
        choice.callerElem = btn;
        const htmlMaker = new HtmlMaker();
        if (htmlMaker.IsEnabledElem(btn) === false)
            return;
        htmlMaker.EnableElem(btn, false);
        const rcDlg = htmlMaker.GetRect(dlg);
        const rcBtn = htmlMaker.GetRect(btn);
        const parentName = dlg.id;
        choice.setListener(`${parentName}-choice`, parentName, `${parentName}-playSelect`, HtmlMakerChoiceHeaderModes.Visible);
        choice.enableOverlay(false);
        choice.applyCss();
        choice.show(`${parseInt(rcBtn.left) - parseInt(rcDlg.left) - 1}`, `${parseInt(rcBtn.top) - parseInt(rcDlg.top) + parseInt(rcBtn.height)}`);
        //choice.moveLeftByWidth(parseInt(rcBtn.left) - parseInt(rcDlg.left) - 1 + parseInt(rcBtn.width))
        choice.enableEvents(
        /*onSelect*/
        async (ev) => {
            //console.log(`[onSelect] ${ev.callerName} ${ev.result}`)
            //choice.dispose()
            if (choice.isCallerTwin(ev.callerName)) {
            }
            else {
                if (ev.result !== ``) {
                    const splited = ev.result.split(`-`);
                    if (splited.length >= 2) {
                        const playIndex = Number(splited[splited.length - 1]);
                        if (this.dockUI.selectedPlayer === this.videoElem) {
                            if (playIndex !== 0) {
                                const existFile = this.revokeSrc();
                                const videoInfo = playIndex !== 0 ? this.playList[playIndex - 1] : existFile;
                                this.setSrc(videoInfo);
                                await this.videoElem.play();
                                console.log(`**update before**`, this.playList);
                                this.playList[playIndex - 1] = existFile;
                                console.log(`**update after** `, this.playList);
                                if (this.videoEditToolTip !== null) {
                                    this.resetVideoEdit();
                                    this.videoEditToolTip.SetVisible(true);
                                }
                            }
                            else {
                                if (this.videoEditToolTip !== null && !this.videoEditToolTip.GetVisible()) {
                                    this.resetVideoEdit();
                                    this.videoEditToolTip.SetVisible(true);
                                }
                            }
                        }
                        else {
                            this.ytDestory();
                            this.ytIndex = playIndex;
                            await this.createYtPlayer();
                            this.ytPlayListUpdate();
                        }
                    }
                }
            }
            htmlMaker.EnableElem(btn, true);
        });
        this.playListCtl = choice;
    }
    //ここからプレイリスト編集UI
    setPlayEditTableRow(cellIndex, rowIndex, title, url, table) {
        const titleCssClassName = this.plEditTitleCssName();
        const inputTitle = new HtmlMakerOptionInput();
        inputTitle.disableKeyDown = false;
        inputTitle.enableClicked = true;
        inputTitle.placeholder = `動画タイトル`;
        inputTitle.value = title;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(inputTitle);
        table.getCell(cellIndex, rowIndex).className = titleCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const urlCssClassName = this.plEditUrlCssName();
        const inputUrl = new HtmlMakerOptionInput();
        inputUrl.disableKeyDown = false;
        inputUrl.enableClicked = true;
        inputUrl.placeholder = `動画VID`;
        inputUrl.value = url;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(inputUrl);
        table.getCell(cellIndex, rowIndex).className = urlCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        if (this.isInElectron) {
            cellIndex++;
            const getCssClassName = this.plEditGetTitleCssName();
            table.getCell(cellIndex, rowIndex).typeInfo.setButton(`💫`);
            table.getCell(cellIndex, rowIndex).className = getCssClassName;
            table.getCell(cellIndex, rowIndex).tdName = `td_` + getCssClassName;
            table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        }
        cellIndex++;
        const upCssClassName = this.plEditUpCssName();
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(`🔼`);
        table.getCell(cellIndex, rowIndex).className = upCssClassName;
        table.getCell(cellIndex, rowIndex).tdName = `td_` + upCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const dnCssClassName = this.plEditDnCssName();
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(`🔽`);
        table.getCell(cellIndex, rowIndex).className = dnCssClassName;
        table.getCell(cellIndex, rowIndex).tdName = `td_` + dnCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    }
    makePlayEditTable() {
        const nPl = 300;
        //テーブル作成
        const nCol = this.isInElectron ? 5 : 4;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, nPl);
        //カラム定義
        for (let iPl = 0; iPl < nPl; iPl++) {
            let title = ``;
            let url = ``;
            if (iPl < ytInfos.length) {
                const info = ytInfos[iPl];
                title = info.title;
                url = this.ytVid(info.url);
            }
            this.setPlayEditTableRow(0, iPl, title, url, table);
        }
        //行テンプレート初期化
        table.makeRowTemplate(this.plEditTableRowCssName());
        return table;
    }
    onPlayEditActionReq = async () => {
        if (this.playEditToolTip === null)
            return;
        const rows = this.playEditToolTip.TableRows();
        if (rows === null)
            return;
        let isSaveDl = true;
        if (ElectronTools.isInElectron) {
            const msgbox = new EvonaMessageBox;
            msgbox.setYesNo();
            const saveMsg = `【はい】　　アプリフォルダへ保存　　　`
                + `<br>`
                + `【いいえ】　ダウンロードフォルダへ保存`;
            const res = await msgbox.showWait(`再生リストを保存しますか？<br>${saveMsg}`);
            switch (res) {
                case MessageBoxResultTypes.Cancel:
                    return;
                case MessageBoxResultTypes.Yes:
                    isSaveDl = false;
                    break;
                case MessageBoxResultTypes.No:
                    isSaveDl = true;
                    break;
            }
        }
        const plArray = new Array;
        for (const row of rows) {
            const texts = this.playEditToolTip.RowTexts(row);
            const info = new ytInfo;
            info.title = texts.get(this.plEditTitleCssName()) || ``;
            info.url = texts.get(this.plEditUrlCssName()) || ``;
            plArray.push(info);
        }
        const plJson = JSON.stringify(plArray, null, 2);
        if (isSaveDl) {
            const plFile = `playList.ytpl`;
            this.downloadVideoInfoFile(plFile, plJson);
            const msgbox = new EvonaMessageBox;
            await msgbox.showWait(`ダウンロードフォルダへプレイリストを保存しました。<br>${plFile}`);
            return;
        }
        const plFile = `playList.ytpl`;
        const bodyText = JSON.stringify({ file: plFile, list: plJson });
        ElectronTools.request(`saveJson`, bodyText);
        const msgbox = new EvonaMessageBox;
        await msgbox.showWait(`アプリフォルダへプレイリストを保存しました。<br>${plFile}`);
    };
    onPlayEditButtonClick = async (rowindex, btn, div, tbl, row, col) => {
        console.log(`onPlayEditButtonClick`, rowindex, btn, div, tbl, row, col);
        if (rowindex <= -1)
            return;
        switch (btn.className) {
            case this.plEditGetTitleCssName():
                this.sendGetTitle(row);
                break;
            case this.plEditUpCssName():
                this.swap(row, -1);
                break;
            case this.plEditDnCssName():
                this.swap(row, 1);
                break;
        }
    };
    swap(row, ofs) {
        if (this.playEditToolTip === null)
            return;
        const rows = this.playEditToolTip.TableRows();
        if (rows === null)
            return;
        const titleCss = this.plEditTitleCssName();
        const urlCss = this.plEditUrlCssName();
        const row2 = rows[row.rowIndex + ofs];
        const texts1 = this.playEditToolTip.RowTexts(row);
        const texts2 = this.playEditToolTip.RowTexts(row2);
        const title1 = texts1.get(titleCss) || ``;
        const url1 = texts1.get(urlCss) || ``;
        const title2 = texts2.get(titleCss) || ``;
        const url2 = texts2.get(urlCss) || ``;
        const elems1 = this.playEditToolTip.RowElems(row.rowIndex);
        const elems2 = this.playEditToolTip.RowElems(row.rowIndex + ofs);
        const title1Elem = elems1.get(titleCss) || null;
        const url1Elem = elems1.get(urlCss) || null;
        const title2Elem = elems2.get(titleCss) || null;
        const url2Elem = elems2.get(urlCss) || null;
        if (title1Elem && url1Elem && title2Elem && url2Elem) {
            title1Elem.value = title2;
            url1Elem.value = url2;
            title2Elem.value = title1;
            url2Elem.value = url1;
        }
    }
    async sendGetTitle(row) {
        if (!this.isInElectron) {
            // 【通常のブラウザ環境の場合】
            // エラーを出さずに、ブラウザ用の別の処理をするか、警告を出します
            console.log("通常のWebブラウザ環境です。Electron専用機能はスキップします。");
            //alert("この機能は、デスクトップアプリ版（Electron）でのみご利用いただけます。");
            const msgbox = new EvonaMessageBox();
            await msgbox.showWait("この機能は、デスクトップアプリ版（Electron）でのみご利用いただけます。");
            return;
        }
        const titleCss = this.plEditTitleCssName();
        const urlCss = this.plEditUrlCssName();
        const texts = this.playEditToolTip.RowTexts(row);
        const title = texts.get(titleCss) || ``;
        const url = texts.get(urlCss) || ``;
        const vid = convYtUrlPrefix(url);
        console.log(title, url, vid);
        // 【Electron環境の場合】
        // ブラウザエラーを防ぐため、この中だけで electron を読み込む
        const { ipcRenderer } = window.require('electron');
        console.log("Electron環境を検出しました。メインプロセスに合図を送ります。");
        //ipcRenderer.send('start-scraping');
        const result = await ipcRenderer.invoke('start-scraping', vid);
        console.log(`**タイトル取得結果**`, result);
        if (Array.isArray(result)) {
            const resArray = result;
            if (resArray.length >= 1) {
                const msgbox = new EvonaMessageBox();
                await msgbox.showWait(`動画タイトルを取得しました。<br>${resArray[0].title}`);
                const elems1 = this.playEditToolTip.RowElems(row.rowIndex);
                const title1Elem = elems1.get(titleCss) || null;
                title1Elem.value = resArray[0].title;
            }
        }
    }
    async makePlayEditCtlToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(`play`, `edit`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName, HtmlMakerToolTipCloseTypes.InVisible);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            const table = await this.makePlayEditTable();
            let uiLabelText = `プレイリスト編集`;
            toolTipNew.name = toolTipName;
            toolTipNew.SetTitle(uiLabelText);
            toolTipNew.EnableAction(`保存`, this.onPlayEditActionReq);
            //toolTipNew.InvisibleAll()
            toolTipNew.VisibleCpBtn(false);
            toolTipNew.VisibleMgrBtn(false);
            toolTipNew.SetTable(table, this.playEditCssText());
            toolTipNew.heightPx = `400`;
            toolTipNew.applyCss();
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.Show(document.body); //videoElem.className
            toolTipNew.SetVisible(false);
            toolTipNew.EnableEvents();
            toolTipNew.onButtonClicked = this.onPlayEditButtonClick;
            //toolTipNew.EnableFirstVisible(onVideoOnFirstVisible)
            //toolTipNew.onChangeVisible = onVideoOnChangeVisible
            const rows = toolTipNew.TableRows();
            if (rows !== null) {
                const firstRow = toolTipNew.RowElems(rows[0].rowIndex);
                if (firstRow !== null) {
                    const elem = firstRow.get(this.plEditUpCssName());
                    if (elem !== undefined) {
                        elem.style.display = `none`;
                    }
                }
                const lastRow = toolTipNew.RowElems(rows[rows.length - 1].rowIndex);
                if (lastRow !== null) {
                    const elem = lastRow.get(this.plEditDnCssName());
                    if (elem !== undefined) {
                        elem.style.display = `none`;
                    }
                }
            }
        }
        return toolTipNew;
    }
    playEditUpdate(ytArray) {
        if (this.playEditToolTip === null)
            return;
        const rows = this.playEditToolTip.TableRows();
        if (rows === null)
            return;
        const titleCss = this.plEditTitleCssName();
        const urlCss = this.plEditUrlCssName();
        let iPl = 0;
        for (const row of rows) {
            const elems1 = this.playEditToolTip.RowElems(row.rowIndex);
            const title1Elem = elems1.get(titleCss) || null;
            const url1Elem = elems1.get(urlCss) || null;
            if (title1Elem && url1Elem) {
                if (iPl < ytArray.length) {
                    title1Elem.value = ytArray[iPl].title;
                    url1Elem.value = this.ytVid(ytArray[iPl].url); //ytArray[iPl].url
                }
                else {
                    title1Elem.value = ``;
                    url1Elem.value = ``;
                }
            }
            iPl++;
        }
    }
    playEditCssText() {
        const btnUpName = this.plEditUpCssName();
        const btnDnName = this.plEditDnCssName();
        const btnCss = this.commonBtnCssText();
        return `
[class*="${btnUpName}"] {
${btnCss}
}
[class*="${btnUpName}"]:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
[class*="${btnDnName}"] {
${btnCss}
}
[class*="${btnDnName}"]:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
`.trim();
    }
    plEditTableRowCssName() {
        return `playEdit-row`;
    }
    plEditTitleCssName() {
        return `playEdit-title`;
    }
    plEditUrlCssName() {
        return `playEdit-url`;
    }
    plEditGetTitleCssName() {
        return `playEdit-get-title`;
    }
    plEditUpCssName() {
        return `playEdit-up`;
    }
    plEditDnCssName() {
        return `playEdit-down`;
    }
    //ここからローカル動画編集UI
    startCanvasTool = null;
    endCanvasTool = null;
    startTime = -1;
    endTime = -1;
    startUpDn = null;
    endUpDn = null;
    onVideoEditOnFirstVisible = async () => {
        if (this.videoEditToolTip === null)
            return;
        const dlg = this.videoEditToolTip.dlg;
        const htmlMaker = new HtmlMaker();
        const rcDlg = htmlMaker.GetRect(dlg);
        const rcSCanvas = htmlMaker.GetRect(this.startCanvasTool.canvas);
        this.startUpDn.show(`${parseInt(rcSCanvas.left) - parseInt(rcDlg.left) - 4}`, 
        //`${parseInt(rcCanvas.top) - parseInt(rcDlg.top) + parseInt(rcCanvas.height)}`
        rcDlg.height);
        const rcECanvas = htmlMaker.GetRect(this.endCanvasTool.canvas);
        this.endUpDn.show(`${parseInt(rcECanvas.left) - parseInt(rcDlg.left) - 4}`, 
        //`${parseInt(rcCanvas.top) - parseInt(rcDlg.top) + parseInt(rcCanvas.height)}`
        rcDlg.height);
    };
    onVideoEditButtonClick = async (rowindex, btn, div, tbl, row, col) => {
        //console.log(`onVideoEditButtonClick`, rowindex, btn, div, tbl, row, col)
        if (rowindex <= -1)
            return;
        switch (btn.className) {
            case this.vidEditStartBtnName():
                if (this.startCanvasTool !== null) {
                    this.startTime = this.videoElem.currentTime;
                    this.startCanvasTool.snapshotFromVideoElem(this.videoElem);
                }
                break;
            case this.vidEditEndBtnName():
                if (this.endCanvasTool !== null) {
                    this.endTime = this.videoElem.currentTime;
                    this.endCanvasTool.snapshotFromVideoElem(this.videoElem);
                }
                break;
        }
    };
    onVideoEditActionReq = async () => {
        const stime = formatTimeWithMs(this.startTime * 1000);
        const etime = formatTimeWithMs(this.endTime * 1000);
        let toFile = this.videoFile;
        const pos = toFile.lastIndexOf(`.`);
        if (pos !== -1) {
            toFile = toFile.substring(0, pos) + `_copy.mp4`;
        }
        console.log(stime, etime, toFile);
        if (this.videoFullPath.length === 0) {
            const msgbox = new EvonaMessageBox();
            await msgbox.showWait("この機能は Electron 環境でのみ動作します。");
            return;
        }
        if (this.startTime < 0 || this.endTime < 0) {
            const msgbox = new EvonaMessageBox();
            await msgbox.showWait("切り出し位置を確定してください。");
            return;
        }
        function formatTimeWithMs(ms) {
            const totalSeconds = Math.floor(ms / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const milliseconds = Math.floor(ms) % 1000;
            const hh = String(hours).padStart(2, '0');
            const mm = String(minutes).padStart(2, '0');
            const ss = String(seconds).padStart(2, '0');
            const sss = String(milliseconds).padStart(3, '0');
            return `${hh}:${mm}:${ss}.${sss}`;
        }
        const fsHtmlMaker = this.fsHtmlMaker;
        const splashName = this.splashName;
        const msgElem = fsHtmlMaker.getFullScreenMsgElem(splashName);
        fsHtmlMaker.showFullScreenCss(splashName);
        msgElem.innerHTML = `切り出し中 [${toFile}] ...`;
        const bodyText = JSON.stringify({ file: this.videoFullPath, stime: stime, etime: etime, toFile: toFile });
        await ElectronTools.request(`mp4_splice`, bodyText);
        fsHtmlMaker.hideFullScreenCss(splashName);
    };
    makeVideoEditTable() {
        //テーブル作成
        const nCanvas = 2;
        const nCol = 2;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, nCanvas);
        //カラム定義
        let rowIndex = 0;
        let cellIndex = 0;
        const startCanvasClassName = this.vidEditStartCanvasName();
        table.getCell(cellIndex, rowIndex).typeInfo.setPlain(``);
        table.getCell(cellIndex, rowIndex).className = startCanvasClassName;
        table.getCell(cellIndex, rowIndex).tdName = `td_` + startCanvasClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const endCanvasClassName = this.vidEditEndCanvasName();
        table.getCell(cellIndex, rowIndex).typeInfo.setPlain(``);
        table.getCell(cellIndex, rowIndex).className = endCanvasClassName;
        table.getCell(cellIndex, rowIndex).tdName = `td_` + endCanvasClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        rowIndex = 1;
        cellIndex = 0;
        const startBtnClassName = this.vidEditStartBtnName();
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(`開始位置`);
        table.getCell(cellIndex, rowIndex).className = startBtnClassName;
        table.getCell(cellIndex, rowIndex).tdName = `td_` + startBtnClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const endBtnClassName = this.vidEditEndBtnName();
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(`終了位置`);
        table.getCell(cellIndex, rowIndex).className = endBtnClassName;
        table.getCell(cellIndex, rowIndex).tdName = `td_` + endBtnClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        //行テンプレート初期化
        table.makeRowTemplate(this.vidEditTableRowCssName());
        return table;
    }
    makeVideoEditCanvas(toolTipNew) {
        const tds = toolTipNew.RowTds(0);
        if (tds === null)
            return;
        const canvasStartName = this.vidEditStartCanvasName();
        const canvasEndName = this.vidEditEndCanvasName();
        const tdStart = tds.get(`td_` + canvasStartName);
        if (tdStart === undefined)
            return;
        const tdEnd = tds.get(`td_` + canvasEndName);
        if (tdEnd === undefined)
            return;
        const startCanvasTool = new HtmlMakerCanvasTool();
        const startCanvas = startCanvasTool.create2dContext();
        startCanvas.className = canvasStartName;
        startCanvas.id = canvasStartName;
        startCanvas.width = 128; //videoElem.videoWidth
        startCanvas.height = 128; //videoElem.videoHeight
        const endCanvasTool = new HtmlMakerCanvasTool();
        const endCanvas = endCanvasTool.create2dContext();
        endCanvas.className = canvasEndName;
        endCanvas.id = canvasEndName;
        endCanvas.width = 128; //videoElem.videoWidth
        endCanvas.height = 128; //videoElem.videoHeight
        tdStart.appendChild(startCanvas);
        tdEnd.appendChild(endCanvas);
        this.startCanvasTool = startCanvasTool;
        this.endCanvasTool = endCanvasTool;
    }
    async makeVideoEditCtlToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(`video`, `edit`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName, HtmlMakerToolTipCloseTypes.InVisible);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            const table = await this.makeVideoEditTable();
            let uiLabelText = `部分切り出し`;
            toolTipNew.name = toolTipName;
            toolTipNew.SetTitle(uiLabelText);
            toolTipNew.EnableAction(`保存`, this.onVideoEditActionReq);
            //toolTipNew.InvisibleAll()
            toolTipNew.VisibleCpBtn(false);
            toolTipNew.VisibleMgrBtn(false);
            toolTipNew.SetTable(table, this.videoEditCssText());
            toolTipNew.heightPx = `400`;
            toolTipNew.applyCss();
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.Show(document.body); //videoElem.className
            toolTipNew.SetVisible(false);
            toolTipNew.EnableEvents();
            toolTipNew.EnableFirstVisible(this.onVideoEditOnFirstVisible);
            toolTipNew.onButtonClicked = this.onVideoEditButtonClick;
            this.makeVideoEditCanvas(toolTipNew);
            this.startUpDn = this.makeSeekCtl(toolTipNew, `startUpDn`, this.startCanvasTool);
            this.endUpDn = this.makeSeekCtl(toolTipNew, `endUpDn`, this.endCanvasTool);
        }
        return toolTipNew;
    }
    videoEditCssText() {
        const canvasStartName = this.vidEditStartCanvasName();
        const canvasEndName = this.vidEditEndCanvasName();
        const btnStartName = this.vidEditStartBtnName();
        const btnEndName = this.vidEditEndBtnName();
        const canvasCss = `
background: ${HtmlMakerCommonCss.normBkColor};
color: black;
border: 1px solid #777;
cursor: pointer;
transition: background 0.2s;
`;
        const btnCss = `
background: ${HtmlMakerCommonCss.normBkColor};
color: black;
border: 1px solid #777;
border-radius: 3px;
width: 100%;
height: 28px;
display: inline-flex;
align-items: center;
justify-content: center;
font-size: 14px;
padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
cursor: pointer;
transition: background 0.2s;
`;
        return `
[class="${canvasStartName}"] {
${canvasCss}
}
[class="${canvasEndName}"] {
${canvasCss}
}
[class*="${btnStartName}"] {
${btnCss}
}
[class*="${btnStartName}"]:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
[class*="${btnEndName}"] {
${btnCss}
}
[class*="${btnEndName}"]:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
`.trim();
    }
    vidEditTableRowCssName() {
        return `videoEdit-row`;
    }
    vidEditStartCanvasName() {
        return `videoEdit-start-canvas`;
    }
    vidEditEndCanvasName() {
        return `videoEdit-end-canvas`;
    }
    vidEditStartBtnName() {
        return `videoEdit-start-btn`;
    }
    vidEditEndBtnName() {
        return `videoEdit-end-btn`;
    }
    resetVideoEdit() {
        if (this.videoEditToolTip !== null) {
            this.videoEditToolTip.SetVisible(false);
            if (this.startCanvasTool !== null)
                this.startCanvasTool.clear();
            if (this.endCanvasTool !== null)
                this.endCanvasTool.clear();
        }
    }
    //
    seekMap = new Map([
        [`10.0s`, `10000`],
        [`1.0s`, `1000`],
        [`0.5s`, `500`],
        [`0.3s`, `300`],
        [`0.1s`, `100`],
        [`-0.1s`, `-100`],
        [`-0.3s`, `-300`],
        [`-0.5s`, `-500`],
        [`-1.0s`, `-1000`],
        [`-10.0s`, `-10000`],
    ]);
    makeSeekCtl(toolTipNew, ctlName, caller) {
        let callerText = `-0.1s`;
        const pair = new Array;
        for (const [key, seek] of this.seekMap) {
            pair.push(`${key}/${seek}`);
        }
        const callerName = caller.canvas.parentElement.className; //`td_`
        const parentClassName = callerName;
        const updn = new HtmlMakerUpDown();
        updn.dir = HtmlMakerUpDownDirTypes.Horz;
        updn.valueWidth = 56;
        updn.valueFontSize = 18;
        updn.setListener(ctlName, parentClassName, callerName);
        updn.setSelectedByValue(callerText, pair);
        updn.applyCss();
        updn.show(`0`, `0`);
        updn.enableEvents(
        /*onApply*/ async (ev) => {
            console.log(`[onApply] ${ev.callerName} ${ev.result}`);
            const isStartCanvas = ev.callerName.includes(this.startCanvasTool.canvas.className);
            const updnCtl = isStartCanvas ? this.startUpDn : this.endUpDn;
            const pair = updnCtl.getValue(updnCtl.selectedIndex);
            console.log(pair);
            let seekTo = isStartCanvas ? this.startTime : this.endTime;
            if (seekTo < 0)
                seekTo = 0;
            const seekOfs = Number(pair[1]);
            this.startPauseToSeek(seekTo, seekOfs);
        }, 
        /*onUp*/ async (ev) => {
            //console.log(`[onUp] ${ev.callerName} ${ev.result}`)
        }, 
        /*onDown*/ async (ev) => {
            //console.log(`[onDown] ${ev.callerName} ${ev.result}`)
        });
        //this.enableWindowEvent()
        updn.enableOverlay(false);
        return updn;
    }
    //ここからローカル動画再生UI
    onVideoOnFirstVisible = async () => {
        if (this.videoToolTip === null)
            return;
        const dlg = this.videoToolTip.dlg;
        const rcDlg = dlg.getBoundingClientRect();
        if (this.dockUI.selectedPlayer === this.videoElem) {
            const rcVideo = this.videoElem.getBoundingClientRect();
            dlg.style.left = `${rcVideo.left + rcDlg.width / 2 + 20}px`;
            dlg.style.top = `${rcVideo.top + 20}px`;
        }
        else {
            const rcVideo = document.getElementById(this.ytElemId).getBoundingClientRect();
            dlg.style.left = `${rcVideo.left + rcDlg.width / 2 + 20}px`;
            dlg.style.top = `${rcVideo.top + 20}px`;
            this.setPlayListItems = this.setYtPlayListItems;
            this.makePlayListCtl();
            this.ytPlayListUpdate();
            if (this.playListCtl !== null)
                this.playListCtl.setVisible(false);
            if (this.playEditToolTip !== null)
                this.playEditToolTip.SetVisible(false);
        }
        if (this.timeSelectCtl !== null) {
            const dlg = this.videoToolTip.dlg;
            const rcDlg = this.timeSelectCtl.htmlMaker.GetRect(dlg);
            const rcCtl = this.timeSelectCtl.getRect();
            const left = (parseInt(rcDlg.width) - rcCtl.width) / 2;
            const top = parseInt(rcDlg.height);
            this.timeSelectCtl.moveTo(left, top);
        }
    };
    onVideoOnChangeVisible = async (toTrue) => {
        if (this.dockUI.selectedPlayer === this.videoElem) {
            HtmlMakerMisc.SetVisible(this.dockUI.ytPlayer, false);
        }
        else {
            HtmlMakerMisc.SetVisible(this.videoElem, false);
        }
        HtmlMakerMisc.SetVisible(this.videoOpenButton, true);
        //Ytのときだけ表示
        const visible = this.dockUI.selectedPlayer === this.dockUI.ytPlayer ? true : false;
        HtmlMakerMisc.SetVisible(this.videoEditButton, visible);
        //playEditToolTip!.SetVisible(visible)
    };
    openUI = null;
    onClickOpenBtn = async (event) => {
        if (this.openUI !== null)
            return;
        this.openUI = new FileSelect();
        if (this.dockUI.selectedPlayer === this.dockUI.ytPlayer) {
            this.openUI.accept = `.ytpl`;
            this.openUI.multiple = false;
        }
        this.openUI.onSelect = async (files) => {
            if (this.videoOpenButton === null)
                return;
            if (this.dockUI.selectedPlayer === this.videoElem) {
                await this.doDropVideoFiles(this.videoOpenButton, files);
            }
            else {
                const jsonURL = URL.createObjectURL(files[0]);
                const dataArray = await this.env.loadJson(jsonURL);
                URL.revokeObjectURL(jsonURL);
                console.log(dataArray);
                // ⚡️ 鉄壁の検査線：1件目のデータを取り出して、.ytpl 特有のプロティ（title）があるか逆引きする！
                if (Array.isArray(dataArray) && dataArray.length > 0 && !("title" in dataArray[0])) {
                    console.error("❌【防衛線発火】ファイルはJSONだけど、中身が.ytplデータじゃありません！");
                    const msgbox = new EvonaMessageBox();
                    await msgbox.showWait("選択されたファイルの形式（内容）が正しくありません。");
                    return; // 処理をここで安全にブレーキ（遮断）して、クラッシュを未然に防ぎます！
                }
                const ytArray = dataArray;
                ytInfos.splice(0, ytInfos.length);
                for (const info of ytArray) {
                    if (info.url.length === 0)
                        continue;
                    if (isYtUrlPrefix(info.url)) { }
                    else if (isYtUrlShortPrefix(info.url)) { }
                    else {
                        info.url = convYtUrlPrefix(info.url);
                    }
                    ytInfos.push(info);
                }
                this.ytFirstPlay = true;
                this.ytFirstSeek = -1;
                this.ytIndex = 0;
                this.ytDestory();
                await this.createYtPlayer();
                this.setPlayListItems = this.setYtPlayListItems;
                this.makePlayListCtl();
                this.ytPlayListUpdate();
                this.playEditUpdate(ytInfos);
            }
            this.openUI = null;
        };
        this.openUI.onCancel = async () => {
            this.openUI = null;
        };
        this.openUI.parentElem = this.videoOpenButton;
        this.openUI.Open();
    };
    onClickBackBtn = async (event) => {
        if (this.dockUI.selectedPlayer === this.videoElem)
            this.videoElem.currentTime = 0;
        else {
            this.ytPlayer.seekTo(0, true);
            this.ytPlayer.playVideo();
        }
    };
    onClickNextBtn = async (event) => {
        if (this.dockUI.selectedPlayer === this.videoElem)
            await this.playNext();
        else
            await this.ytPlayNext();
    };
    onClickSeekBtn = async (event) => {
        if (this.timeSelectCtl === null)
            return;
        this.timeSelectCtl.setVisible(!this.timeSelectCtl.getVisible());
    };
    onClickListBtn = async (event) => {
        this.makePlayListCtl();
    };
    onClickEditBtn = async (event) => {
        if (this.playEditToolTip === null)
            return;
        const visible = this.playEditToolTip.GetVisible();
        this.playEditToolTip.SetVisible(!visible);
    };
    onVideoListButtonCancel = async (choice, callerElem) => {
        choice.dispose();
        if (callerElem !== null) {
            const htmlMaker = new HtmlMaker();
            htmlMaker.EnableElem(callerElem, true);
        }
    };
    videoOpenButton = null;
    videoBackButton = null;
    videoNextButton = null;
    videoSeekButton = null;
    videoListButton = null;
    videoEditButton = null;
    makeVideoCtlBtns() {
        if (this.videoToolTip === null)
            return;
        if (this.videoToolTip.actDiv === null)
            return;
        const actDiv = this.videoToolTip.actDiv;
        const actDivParent = actDiv.parentElement;
        const openBtnName = `${actDiv.className}-open`;
        const backBtnName = `${actDiv.className}-back`;
        const nextBtnName = `${actDiv.className}-next`;
        const seekBtnName = `${actDiv.className}-seek`;
        const listBtnName = `${actDiv.className}-list`;
        const editBtnName = `${actDiv.className}-edit`;
        const openButton = document.createElement("button");
        openButton.id = openBtnName;
        openButton.className = openBtnName;
        openButton.innerHTML = FileSelect.emoji1;
        openButton.title = `FileSelect`;
        actDivParent.appendChild(openButton);
        openButton.addEventListener("click", this.onClickOpenBtn);
        const backButton = document.createElement("button");
        backButton.id = backBtnName;
        backButton.className = backBtnName;
        backButton.innerHTML = `⏮`;
        backButton.title = `Back`;
        actDivParent.appendChild(backButton);
        backButton.addEventListener("click", this.onClickBackBtn);
        const nextButton = document.createElement("button");
        nextButton.id = nextBtnName;
        nextButton.className = nextBtnName;
        nextButton.innerHTML = `⏭`;
        nextButton.title = `Next`;
        actDivParent.appendChild(nextButton);
        nextButton.addEventListener("click", this.onClickNextBtn);
        const seekButton = document.createElement("button");
        seekButton.id = seekBtnName;
        seekButton.className = seekBtnName;
        seekButton.innerHTML = `🔄`;
        seekButton.title = `Seek`;
        actDivParent.appendChild(seekButton);
        seekButton.addEventListener("click", this.onClickSeekBtn);
        const listButton = document.createElement("button");
        listButton.id = listBtnName;
        listButton.className = listBtnName;
        listButton.innerHTML = `🎦`;
        listButton.title = `PlayList`;
        actDivParent.appendChild(listButton);
        listButton.addEventListener("click", this.onClickListBtn);
        const editButton = document.createElement("button");
        editButton.id = editBtnName;
        editButton.className = editBtnName;
        editButton.innerHTML = `🎹`;
        editButton.title = `EditPlayList`;
        actDivParent.appendChild(editButton);
        editButton.addEventListener("click", this.onClickEditBtn);
        this.videoOpenButton = openButton;
        this.videoBackButton = backButton;
        this.videoNextButton = nextButton;
        this.videoSeekButton = seekButton;
        this.videoListButton = listButton;
        this.videoEditButton = editButton;
    }
    videoCtlCssText() {
        const btnOpenName = `${this.videoOpenButton.className}`;
        const btnBackName = `${this.videoBackButton.className}`;
        const btnNextName = `${this.videoNextButton.className}`;
        const btnSeekName = `${this.videoSeekButton.className}`;
        const btnListName = `${this.videoListButton.className}`;
        const btnEditName = `${this.videoEditButton.className}`;
        const btnCss = this.commonBtnCssText();
        return `
#${btnOpenName} {
${btnCss}
}
#${btnOpenName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${btnBackName} {
${btnCss}
}
#${btnBackName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${btnNextName} {
${btnCss}
}
#${btnNextName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${btnSeekName} {
${btnCss}
}
#${btnSeekName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${btnListName} {
${btnCss}
}
#${btnListName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${btnEditName} {
${btnCss}
}
#${btnEditName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
`.trim();
    }
    async makeVideoCtlToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(`video`, `controls`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName, HtmlMakerToolTipCloseTypes.None);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            this.videoToolTip = toolTipNew;
            this.makeVideoCtlBtns();
            let uiLabelText = ``;
            toolTipNew.name = toolTipName;
            toolTipNew.SetTitle(uiLabelText);
            toolTipNew.InvisibleAll();
            toolTipNew.SetMemo(``, this.videoCtlCssText());
            toolTipNew.applyCss();
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.heightPx = `100`;
            toolTipNew.Show(document.body);
            toolTipNew.SetVisible(false);
            toolTipNew.EnableEvents();
            toolTipNew.EnableFirstVisible(this.onVideoOnFirstVisible);
            toolTipNew.onChangeVisible = this.onVideoOnChangeVisible;
            this.makeTimeSelectCtl();
            this.playEditToolTip = await this.makePlayEditCtlToolTip();
            this.videoEditToolTip = await this.makeVideoEditCtlToolTip();
        }
        return toolTipNew;
    }
    commonBtnCssText() {
        const btnCss = `
background: ${HtmlMakerCommonCss.normBkColor};
color: black;
border: 1px solid #777;
border-radius: 3px;
width: 24px;
height: 24px;
display: inline-flex;
align-items: center;
justify-content: center;
font-size: 12px;
padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
cursor: pointer;
transition: background 0.2s;
`.trim();
        return btnCss;
    }
    /*YouTube再生（iframe）
    const iframeElem = document.createElement(`iframe`)
    const iframeCssName = `youtube-test`
    iframeElem.className = iframeCssName
    iframeElem.id = iframeCssName
    iframeElem.style.display = ``   //none
    iframeElem.style.width = `100vw`
    iframeElem.style.height = `100vh`
    iframeElem.src = `https://youtube.com/embed/_ey15xZIZxw`
    iframeElem.title = "YouTube video player"
    iframeElem.frameBorder = "0"
    iframeElem.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframeElem.allowFullscreen = true
    document.body.appendChild(iframeElem)
    */
    /*YouTube再生（YouTube API） */
    ytVid(url) {
        if (isYtUrlShortPrefix(url)) {
            url = convYtUrlShortPrefix(url);
            return url;
        }
        const pos = url.indexOf(`?v=`);
        if (pos === -1)
            return ``;
        return url.substring(pos + 3);
    }
    /*
    for (const info of ytInfos) {
        console.log(ytVid(info.url))
    }
    */
    //YouTube再生（YouTube API）
    ytElemId = 'youtube-player'; //このdivを利用して再生動画を表示
    setupYtPlayer() {
        // 1. すでに画面に同じIDのdivがない場合だけ作成して追加する
        if (!document.getElementById(this.ytElemId)) {
            const placeholderDiv = document.createElement('div');
            placeholderDiv.id = this.ytElemId;
            placeholderDiv.style.display = 'none';
            placeholderDiv.style.width = '100vw';
            placeholderDiv.style.height = '100vh';
            document.body.appendChild(placeholderDiv);
            this.dockUI.ytElemId = this.ytElemId;
            this.dockUI.ytPlayer = placeholderDiv;
        }
        // 2. YouTube APIのスクリプトを動的に読み込む
        const ytApiScrElem = document.createElement('script');
        ytApiScrElem.src = 'https://youtube.com/iframe_api'; // ← ここを正しく修正しました
        document.head.appendChild(ytApiScrElem);
        // 3. APIの準備が完了したときに自動的に呼ばれる関数
        window.onYouTubeIframeAPIReady = () => {
            console.log('APIの初期化が始まりました');
            this.dockUI.ytStartPlay = this.createYtPlayer;
            switch (this.env.action) {
                case EvonaActions.YtPlay:
                    this.dockUI.selectYtPlay();
                    break;
            }
        };
    }
    // YouTubeプレイヤー本体（再生と終了イベント待ち）
    ytFirstPlay = true;
    ytFirstSeek = -1;
    ytIndex = 0;
    ytPlayer = null;
    async createYtPlayer() {
        if (ytInfos.length === 0) {
            const msgbox = new EvonaMessageBox;
            await msgbox.showWait(`「${FileSelect.emoji1}」をタップしてプレイリストを選択してください。`);
            return;
        }
        if (this.ytFirstPlay) {
            this.ytFirstPlay = false;
            const currentPlayText = await ClipboardHelper.get();
            if (currentPlayText !== null && currentPlayText !== ``) {
                const currentPlay = currentPlayText?.split(`\t`);
                if (currentPlay.length === 2) {
                    const currentTitle = currentPlay[0];
                    let currentTime = isNaN(Number(currentPlay[1])) ? 0 : Number(currentPlay[1]);
                    const exist = ytInfos.find(info => info.title === currentTitle);
                    if (exist !== undefined) {
                        const parentClassName = this.ytElemId;
                        const msgbox = new EvonaMessageBox;
                        msgbox.setParent(parentClassName);
                        msgbox.setYesNo();
                        let res = MessageBoxResultTypes.None;
                        res = await msgbox.showWait(`${currentTitle}<br>続きを再開しますか？`);
                        if (res === MessageBoxResultTypes.Yes) {
                            this.ytFirstSeek = currentTime;
                            this.ytIndex = ytInfos.findIndex(info => info.title === currentTitle);
                        }
                    }
                }
            }
        }
        const info = ytInfos[this.ytIndex];
        const vid = this.ytVid(info.url);
        this.ytPlayer = new YT.Player(this.ytElemId, {
            width: '100%',
            height: '100%',
            videoId: vid, // 動画IDを指定（例：'_ey15xZIZxw'）
            playerVars: {
                playsinline: 1,
                // 自動再生（テスト時はミュートとセットにすると確実です）
                autoplay: 1,
                mute: 0
            },
            events: {
                onReady: () => {
                    console.log('YouTubeプレイヤーの準備が完了し、動画が表示されました！');
                    if (this.ytFirstSeek > 0) {
                        this.ytPlayer.seekTo(this.ytFirstSeek, true);
                        this.ytFirstSeek = -1;
                    }
                    this.ytPlayer.playVideo();
                },
                onStateChange: async (event) => {
                    //console.log('現在の状態コード:', event.data);
                    switch (event.data) {
                        case 0: //再生終了：YT.PlayerState.ENDED
                            console.log('動画の再生が終了しました！');
                            //alert('再生が終了しました');
                            await this.ytPlayNext();
                            break;
                        case 2: //一時停止：YT.PlayerState.PAUSED
                            const pauseTime = this.ytPlayer.getCurrentTime();
                            const yti = ytInfos[this.ytIndex];
                            const res = await ClipboardHelper.put(`${yti.title}\t${pauseTime}`);
                            break;
                    }
                }
            }
        });
    }
    ytDestory() {
        if (this.ytPlayer !== null) {
            this.ytPlayer.destroy();
            this.ytPlayer = null;
        }
    }
    async ytPlayNext() {
        this.ytDestory();
        this.ytIndex++;
        if (this.ytIndex < ytInfos.length) {
            await this.createYtPlayer();
            this.ytPlayListUpdate();
        }
    }
    ytPlayListUpdate() {
        if (this.playListCtl !== null) {
            const texts = new Array;
            let playIndex = -1;
            for (const info of ytInfos) {
                playIndex++;
                if (this.ytIndex === playIndex) {
                    texts.push(`${info.title} ${this.currentPlayMark}`);
                }
                else {
                    texts.push(`${info.title}`);
                }
                this.playListCtl.UpdateItems(texts);
                this.playListCtl.scroll(this.ytIndex);
            }
        }
    }
    setYtPlayListItems(choiceItems) {
        let playIndex = -1;
        for (const info of ytInfos) {
            playIndex++;
            const itemMedia = new HtmlMakerChoiceItem();
            itemMedia.key = `${info.url}-${playIndex}`;
            itemMedia.text = info.title; //`${info.title} ${this.currentPlayMark}`
            choiceItems.push(itemMedia);
        }
    }
}
// --------------------------------------------------
//# sourceMappingURL=VideoPlayer.js.map