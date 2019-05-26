BUILD_DIR=build
SCRIPT_DIR=bin
TEST_DIR=tst
SCRIPT_NAME=gops
SCRIPT=${SCRIPT_DIR}/${SCRIPT_NAME}.js
TEST_DIFF_ARGS=--text --side-by-side --minimal

run :
	@node ${SCRIPT}

test :
	@mkdir -p ${BUILD_DIR}
	@node -e "Math.random = () => 0.4; require('./${SCRIPT}')" > "${BUILD_DIR}/${SCRIPT_NAME}.out"
	diff ${TEST_DIFF_ARGS} --from-file=${TEST_DIR}/${SCRIPT_NAME}.out ${BUILD_DIR}/${SCRIPT_NAME}.out 
	@echo ===================================
	@echo SIDE BY SIDE COMPARISON TEST PASSED

autotest :
	fswatch ${SCRIPT} | xargs -n1 -I{} -- make test
