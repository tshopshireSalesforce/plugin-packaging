/*
 * Copyright (c) 2022, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as path from 'path';
import { execCmd, TestSession } from '@salesforce/cli-plugins-testkit';
import { OrgConfigProperties } from '@salesforce/core';
import { expect } from 'chai';
import { PackageInstalledListResult } from '../../../../src/commands/force/package/beta/installed/list';

let session: TestSession;
let usernameOrAlias: string;

// TODO: na40 required as DevHub
before(async () => {
  const executablePath = path.join(process.cwd(), 'bin', 'dev');
  session = await TestSession.create({
    setupCommands: [`${executablePath} config:get ${OrgConfigProperties.TARGET_DEV_HUB} --json`],
    project: { name: 'packageInstalledList' },
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  usernameOrAlias = (session.setup[0] as { result: [{ value: string }] }).result[0].value;

  if (!usernameOrAlias) throw Error('no default username set');
});

after(async () => {
  await session?.clean();
});

describe('package:installed:list', () => {
  it('should list all installed packages in dev hub - human readable results', () => {
    const command = `force:package:beta:installed:list  -u ${usernameOrAlias}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const output = execCmd(command, { ensureExitCode: 0 }).shellOutput.stdout as string;
    expect(output).to.match(
      /ID\s+?Package ID\s+?Package Name\s+?Namespace\s+?Package Version ID\s+?Version Name\s+?Version/
    );
  });

  it('should list all installed packages in dev hub - json', () => {
    const command = `force:package:beta:installed:list  -u ${usernameOrAlias} --json`;
    const output = execCmd<PackageInstalledListResult[]>(command, { ensureExitCode: 0 }).jsonOutput.result[0];
    expect(output).to.have.keys(
      'Id',
      'SubscriberPackageId',
      'SubscriberPackageName',
      'SubscriberPackageNamespace',
      'SubscriberPackageVersionId',
      'SubscriberPackageVersionName',
      'SubscriberPackageVersionNumber'
    );
    expect(output.Id).to.be.a('string');
    expect(output.SubscriberPackageId).to.be.a('string');
    expect(output.SubscriberPackageName).to.be.a('string');
    expect(output.SubscriberPackageNamespace).to.be.a('string');
    expect(output.SubscriberPackageVersionId).to.be.a('string');
    expect(output.SubscriberPackageVersionName).to.be.a('string');
    expect(output.SubscriberPackageVersionNumber).to.be.a('string');
  });
});