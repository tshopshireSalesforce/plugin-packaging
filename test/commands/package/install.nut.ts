/*
 * Copyright (c) 2022, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import path from 'node:path';
import { execCmd, TestSession } from '@salesforce/cli-plugins-testkit';
import { expect } from 'chai';
import { PackagingSObjects } from '@salesforce/packaging';
import { Duration } from '@salesforce/kit';

type PackageInstallRequest = PackagingSObjects.PackageInstallRequest;
type PackageUninstallRequest = PackagingSObjects.SubscriberPackageVersionUninstallRequest;

describe('package install', () => {
  let session: TestSession;
  before(async () => {
    session = await TestSession.create({
      devhubAuthStrategy: 'AUTO',
      scratchOrgs: [
        {
          setDefault: true,
          config: path.join('config', 'project-scratch-def.json'),
        },
      ],
      project: { name: 'packageInstall' },
    });
  });

  after(async () => {
    await session?.clean();
  });

  it('should install ElectronBranding package with polling', () => {
    const command = 'package:install -p 04t6A000002zgKSQAY -w 20';
    const output = execCmd(command, { ensureExitCode: 0, timeout: Duration.minutes(20).milliseconds }).shellOutput
      .stdout;
    expect(output).to.contain('Successfully installed package');
  });

  it('should install DFXP Escape Room package (async) and report', () => {
    const installCommand = 'package:install -p 04t6A000002zgKSQAY --json';
    const installJson = execCmd<PackageInstallRequest>(installCommand, { ensureExitCode: 0 }).jsonOutput?.result;
    expect(installJson).to.have.property('Status', 'IN_PROGRESS');

    const reportCommand = `package:install:report -i ${installJson?.Id} --json`;
    const reportJson = execCmd<PackageInstallRequest>(reportCommand, { ensureExitCode: 0 }).jsonOutput?.result;
    expect(reportJson).to.have.property('Status');
    expect(['IN_PROGRESS', 'SUCCESS']).to.include(reportJson?.Status);
  });

  it('should start an uninstall request, and report on it', () => {
    const uninstallCommand = 'package:uninstall -p 04t6A000002zgKSQAY --json -w 0';
    const uninstallRequest = execCmd<PackageUninstallRequest>(uninstallCommand, {
      ensureExitCode: 0,
    }).jsonOutput?.result;
    expect(['InProgress', 'Success']).to.include(uninstallRequest?.Status);
    expect(uninstallRequest?.Id.startsWith('06y')).to.be.true;

    const uninstallReportCommand = `package:uninstall:report -i ${uninstallRequest?.Id} --json`;
    const uninstallReportResult = execCmd(uninstallReportCommand, { ensureExitCode: 0 }).jsonOutput?.result;
    expect(uninstallReportResult).to.have.all.keys(
      'Id',
      'IsDeleted',
      'CreatedDate',
      'CreatedById',
      'LastModifiedDate',
      'LastModifiedById',
      'SystemModstamp',
      'SubscriberPackageVersionId',
      'Status',
      'attributes'
    );
  });
});
