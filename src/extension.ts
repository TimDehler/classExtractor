import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Classextractor extension running!");

  const extractCommand = vscode.commands.registerTextEditorCommand(
    "classextractor.extractClasses",
    (editor, edit) => {
      const fileType: string = editor.document.languageId;

      const isHTML: boolean = fileType === "html";
      const isLiquid: boolean = fileType === "liquid";
      const isJSX: boolean = fileType === "javascriptreact";

      let regexPattern: RegExp | null = null;

      if (isHTML || isLiquid) {
        regexPattern = /class\s*=\s*(['"])(.*?)\1/g;
      }

      if (isJSX) {
        regexPattern = /className\s*=\s*(['"])(.*?)\1/g;
      }

      if (!regexPattern) {
        vscode.window.showInformationMessage(
          "Classextractor Extension couldnt recognise the file type!"
        );
        return;
      }

      const text: string = editor.document.getText(editor.selection);
      const classSet = new Set<string>();
      let match: RegExpExecArray | null;

      while ((match = regexPattern.exec(text)) !== null) {
        const classList = match[2].trim().split(/\s+/);
        classList.forEach((cls) => classSet.add(cls));
      }

      const uniqueClassNames: string[] = Array.from(classSet);
      const cssClip: string[] = uniqueClassNames.map(
        (className) => `.${className} {}`
      );

      const clipBoardText = cssClip.join("\n");
      vscode.env.clipboard.writeText(clipBoardText).then(() => {
        vscode.window.showInformationMessage(
          "Classextractor copied the class names to your clipboard!"
        );
      });
    }
  );

  context.subscriptions.push(extractCommand);
}

export function deactivate() {}
