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
import { Messages, SfdxPropertyKeys } from '@salesforce/core';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('@salesforce/plugin-packaging', 'package_version_list');
const packaging = Messages.loadMessages('@salesforce/plugin-packaging', 'packaging');

export class PackageVersionListCommand extends SfdxCommand {
  public static readonly description = messages.getMessage('cliDescription');
  public static readonly longDescription = messages.getMessage('cliLongDescription');
  public static readonly help = messages.getMessage('help');
  public static readonly requiresProject = false;
  public static readonly orgType = SfdxPropertyKeys.DEFAULT_DEV_HUB_USERNAME;
  public static readonly requiresDevhubUsername = true;
  public static readonly flagsConfig: FlagsConfig = {
    createdlastdays: flags.number({
      char: 'c',
      description: packaging.getMessage('createdLastDaysDescription'),
      longDescription: packaging.getMessage('createdLastDaysLongDescription'),
      required: false,
    }),
    concise: flags.builtin({
      description: messages.getMessage('conciseDescription'),
      longDescription: messages.getMessage('conciseLongDescription'),
    }),
    modifiedlastdays: flags.number({
      char: 'm',
      description: packaging.getMessage('modifiedLastDaysDescription'),
      longDescription: packaging.getMessage('modifiedLastDaysLongDescription'),
      required: false,
    }),
    packages: flags.array({
      char: 'p',
      description: messages.getMessage('packagesDescription'),
      longDescription: messages.getMessage('packagesLongDescription'),
      required: false,
    }),
    released: flags.boolean({
      char: 'r',
      description: messages.getMessage('releasedDescription'),
      longDescription: messages.getMessage('releasedLongDescription'),
      required: false,
    }),
    orderby: flags.array({
      char: 'o',
      description: messages.getMessage('orderByDescription'),
      longDescription: messages.getMessage('orderByLongDescription'),
      required: false,
    }),
    verbose: flags.builtin({
      description: messages.getMessage('verboseDescription'),
      longDescription: messages.getMessage('verboseLongDescription'),
    }),
  };
  public async run(): Promise<unknown> {
    return Promise.reject('Not yet implemented');
  }
}
