import { LogTable } from "./JsStoreHelper.js";
export async function mainAdmin(env) {
    const args = env.cmd.split(`:`);
    /*
    //DB初期化
    //const workerFile = 'https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.worker.min.js'
    //const workerFile = './jsstore_dist/jsstore.worker.min.js'
    const workerFile = window.EVONA_CONFIG.workerFile
    //import { CharImageTable } from "./ImageLoader.js"
    const dbh = new CharImageTable()
    dbh.connect(workerFile)
    await dbh.initDb()
    let cmdRes: any = false
    switch (args[0]) {
    case `countns`:
        const ns = args.length >= 2 ? args[1] : ``
        cmdRes = await dbh.countNs(ns)
        break
    case `drop`:
        cmdRes = await dbh.dropDb()
        break
    }
    */
    let cmdRes = false;
    switch (args[0]) {
        case `drop`:
            cmdRes = doDrop();
            break;
        case `ref`:
            cmdRes = document.referrer;
            break;
    }
    const log = `[${env.cmd}] res=${cmdRes}`;
    alert(log);
}
async function doDrop() {
    const dbh = new LogTable();
    await dbh.setup();
    const cmdRes = await dbh.dropDb();
    return cmdRes;
}
//# sourceMappingURL=mainAdmin.js.map