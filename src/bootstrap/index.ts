import dataSource from "../database/dataSource";

const bootstrap = async () => {
    try {
        await dataSource.initialize();
        console.info('[info] database initialized')
    } catch (e) {
        console.log(e)
    }
}

bootstrap()