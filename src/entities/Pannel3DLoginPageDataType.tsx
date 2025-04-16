type KeyType = keyof Pannel3DLoginPageDataType;

type Pannel3DLoginPageType = {
    // id: string;
    ifChecked: boolean;
    ifTitle: boolean;
    // group: string;
    relatedTo?: KeyType[];
};

export interface Pannel3DLoginPageDataType {
    password: Pannel3DLoginPageType;
    longerSession: Pannel3DLoginPageType;
    shortSession: Pannel3DLoginPageType;
}
