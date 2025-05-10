import { SupportedFileTypes } from "../enum/SupportedFileTypes";

const Pattern: {
  CLASS: RegExp;
  CLASSNAME: RegExp;
  NGCLASS: RegExp;
} = {
  CLASS: /class\s*=\s*(['"])(.*?)\1/g,
  CLASSNAME: /className\s*=\s*(['"])(.*?)\1/g,
  NGCLASS: /\[ngClass\]\s*=\s*(['"])(.*?)\1/g,
};

const fileTypeToRegex: { [key in SupportedFileTypes]: RegExp } = {
  [SupportedFileTypes.HTML]: Pattern["CLASS"],
  [SupportedFileTypes.LIQUID]: Pattern["CLASS"],
  [SupportedFileTypes.JSX]: Pattern["CLASSNAME"],
  [SupportedFileTypes.VUE]: Pattern["CLASS"],
  [SupportedFileTypes.ANGULAR_TS]: Pattern["NGCLASS"],
  [SupportedFileTypes.SVELTE]: Pattern["CLASS"],
  [SupportedFileTypes.PHP]: Pattern["CLASS"],
  [SupportedFileTypes.HANDLEBARS]: Pattern["CLASS"],
};

export default class ClassExtractorService {
  private vscode: any;

  constructor(vscode: any) {
    this.vscode = vscode;
  }

  public extract = (fileType: string, content: string) => {
    console.log("FileType", fileType);
    const pattern: RegExp | null = this.resolvePattern(fileType);

    if (!pattern) {
      this.showInformationMessage("File type not supported");
      return;
    }

    const classSet = new Set<string>();
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(content)) !== null) {
      const classList = match[2].trim().split(/\s+/);
      classList.forEach((cls) => {
        const cleanedCls = cls.replaceAll("'", "").replaceAll('"', "");
        classSet.add(cleanedCls);
      });
    }

    const uniqueClassNames: string[] = Array.from(classSet);
    const cssClip: string[] = uniqueClassNames.map(
      (className) => `.${className} {}`
    );

    const clipBoardText = cssClip.join("\n");
    this.vscode.env.clipboard.writeText(clipBoardText).then(() => {
      this.showInformationMessage("Copied the class names to your clipboard!");
    });
  };

  private resolvePattern = (fileType: string): RegExp | null => {
    const regex = fileTypeToRegex[fileType as SupportedFileTypes];
    return regex || null;
  };

  private showInformationMessage = (message: string) => {
    this.vscode.window.showInformationMessage(`${message}`);
  };
}
