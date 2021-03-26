import _ from "lodash";

(Window as any).appPageData = [];
let db: Array<{ id: string, layout: any }> = (Window as any).appPageData;

const storageApi = {
    addPage: (pageId: string, layout: any) => {
        const la = { id: pageId, layout };
        db.push(la);
    },

    getPage: (pageId: string) => {
        return _.find(db, { id: pageId });
    }
};

export default storageApi;