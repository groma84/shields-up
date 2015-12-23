module Game {
    export module Assets {
        export class AssetDefinition {
            Id: string;
            Uri: string;

            constructor(id: string, uri: string) {
                this.Id = id;
                this.Uri = uri;
            }
        }
    }
}