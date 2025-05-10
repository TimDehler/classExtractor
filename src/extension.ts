import * as vscode from "vscode";
import ClassExtractorService from "./services/ClassExtractorService";

export function activate(context: vscode.ExtensionContext) {
  console.log("Classextractor extension running!");

  const ClassExtractorServiceInst = new ClassExtractorService(vscode);
  console.log("Instantiated", ClassExtractorServiceInst);

  const extractCommand = vscode.commands.registerTextEditorCommand(
    "classextractor.extractClasses",
    (editor) => {
      const fileType: string = editor.document.languageId;
      const content: string = editor.document.getText();

      ClassExtractorServiceInst.extract(fileType, content);
    }
  );

  context.subscriptions.push(extractCommand);
}

export function deactivate() {}
