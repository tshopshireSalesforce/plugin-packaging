/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

// This is the legacy converted command file. Ignoring code-coverage since this is generated.
// THIS SHOULD BE REMOVED WHEN CONVERTED TO EXTEND SfdxCommand
/* istanbul ignore file */

import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@salesforce/plugin-packaging', 'package1_version_list');

export class Package1VersionListCommand extends SfdxCommand {
  public static readonly description = messages.getMessage('cliDescription');
  public static readonly longDescription = messages.getMessage('longDescription');
  public static readonly help = messages.getMessage('cliHelp');
  public static readonly supportsUsername = true;
  public static readonly requiresProject = true;
  public static readonly flagsConfig: FlagsConfig = {
    packageid: flags.id({
      char: 'i',
      description: messages.getMessage('packageId'),
      longDescription: messages.getMessage('packageIdLong'),
      required: false,
    }),
  };

  public async run(): Promise<unknown> {
    return Promise.reject('Not yet implemented');
  }
}
