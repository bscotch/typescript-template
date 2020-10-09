/**
 * @file Test suite, using Mocha and Chai.
 * Compiled files inside the 'test' folder are excluded from
 * published npm projects.
 * (Note that fs-extra is added as a dev dependency to make
 * sandbox setup much easier. If you aren't using a sandbox
 * you can remove this dependency. If you need fs-extra for
 * your main code, move it into the regular 'dependencies'
 * section of your package.json file)
 */

import {expect} from "chai";
import fs from "fs-extra";

const sandboxRoot = "./sandbox";
const samplesRoot = "./samples";

/**
 * Clone any files in a "./samples" folder into
 * a "./sandbox" folder, overwriting any files
 * currently in there. This is useful for allowing
 * your test suite to make changes to files without
 * changing the originals, so that you can easily
 * reset back to an original state prior to running a test.
 */
function resetSandbox() {
  if(!fs.existsSync(samplesRoot)){
    // Then no samples exist, and no sandbox needed
    return;
  }
  fs.ensureDirSync(sandboxRoot);
  fs.emptyDirSync(sandboxRoot);
  fs.copySync(samplesRoot, sandboxRoot);
}

describe("Test Suite", function () {

  before(function(){
    resetSandbox();
  });

  describe("Test Group", function () {
    it("can do something", function () {
      resetSandbox();
      expect(false).to.be.true;
    });
  });

  after(function(){
    resetSandbox();
  });

});
