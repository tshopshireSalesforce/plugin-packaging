/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@salesforce/plugin-packaging', 'package1_version_create');

export class Package1VersionCreateCommand extends SfdxCommand {
  public static readonly description = messages.getMessage('cliDescription');
  public static readonly longDescription = messages.getMessage('cliDescriptionLong');
  public static readonly help = messages.getMessage('cliHelp');
  public static readonly requiresUsername = true;
  public static readonly requiresProject = true;
  public static readonly flagsConfig: FlagsConfig = {
    packageid: flags.id({
      char: 'i',
      description: messages.getMessage('id'),
      longDescription: messages.getMessage('idLong'),
      required: true,
    }),
    name: flags.string({
      char: 'n',
      description: messages.getMessage('name'),
      longDescription: messages.getMessage('nameLong'),
      required: true,
    }),
    description: flags.string({
      char: 'd',
      description: messages.getMessage('description'),
      longDescription: messages.getMessage('descriptionLong'),
      required: false,
    }),
    version: flags.string({
      char: 'v',
      description: messages.getMessage('version'),
      longDescription: messages.getMessage('versionLong'),
      required: false,
    }),
    managedreleased: flags.boolean({
      char: 'm',
      description: messages.getMessage('managedReleased'),
      longDescription: messages.getMessage('managedReleasedLong'),
      required: false,
    }),
    releasenotesurl: flags.url({
      char: 'r',
      description: messages.getMessage('releaseNotes'),
      longDescription: messages.getMessage('releaseNotesLong'),
      required: false,
    }),
    postinstallurl: flags.url({
      char: 'p',
      description: messages.getMessage('postInstall'),
      longDescription: messages.getMessage('postInstallLong'),
      required: false,
    }),
    installationkey: flags.string({
      char: 'k',
      description: messages.getMessage('installationKey'),
      longDescription: messages.getMessage('installationKeyLong'),
      required: false,
    }),
    wait: flags.number({
      char: 'w',
      description: messages.getMessage('wait'),
      longDescription: messages.getMessage('waitLong'),
      required: false,
    }),
  };

  public async run(): Promise<unknown> {
    return Promise.reject('Not yet implemented');
  }
}
