pipeline {
    agent any
    options {
        preserveStashes()
        timeout(time: 2, unit: 'HOURS') 
    }
    environment {
        min = 4000
        max = 8000
        PORT = "${Math.abs(new Random().nextInt(max-min+1)+min)}"
    }
    stages {
        stage('Prepare for ICD tests') {
           parallel {
                stage('1 Ubuntu 20.04') {
                    agent {
                        label "focal-agent"
                    }
                    steps {
                        prepare_focal_ICD()
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "Ubuntu 20.04 - ICD test preparation - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('2 Ubuntu 22.04') {
                    agent {
                        label "jammy-agent"
                    }
                    steps {
                        prepare_jammy_ICD()
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "Ubuntu 22.04 - ICD test preparation - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('3 macOS 11') {
                    agent {
                        label "macos11-agent"
                    }
                    steps {
                        prepare_macos11_ICD()
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "macOS 11 - ICD test preparation - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('4 macOS 12') {
                    agent {
                        label "macos12-agent"
                    }
                    steps {
                        prepare_macos12_ICD()
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "macOS 12 - ICD test preparation - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('5 macOS 13') {
                    agent {
                        label "macos13-agent"
                    }
                    steps {
                        prepare_macos13_ICD()
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "macOS 13 - ICD test preparation - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('6 RHEL7') {
                    agent {
                        label "rhel7-agent"
                    }
                    steps {
                        prepare_rhel7_ICD()
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "RHEL7 - ICD test preparation - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('7 RHEL8') {
                    agent {
                        label "rhel8-agent"
                    }
                    steps {
                        prepare_rhel8_ICD()
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "RHEL8 - ICD test preparation - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('8 RHEL9') {
                    agent {
                        label "rhel9-agent"
                    }
                    steps {
                        prepare_rhel9_ICD()
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "RHEL9 - ICD test preparation - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
            }
        }
        stage('Build carta-backend') {
            parallel {
                stage('1 Ubuntu 20.04') {
                    agent {
                        label "focal-agent"
                    }
                    steps {
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh "uname -a"
                            sh "lsb_release -a"
                            sh "git clone https://github.com/CARTAvis/carta-backend.git"
                            dir ('carta-backend') {
                                sh "git checkout ${env.CARTA-BACKEND-BRANCH}"
                                sh "git submodule update --init --recursive"
                                dir ('build') {
                                    sh "cmake .. -DCMAKE_CXX_FLAGS='--coverage' -DCMAKE_C_FLAGS='--coverage' -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_FLAGS='-O0 -g -fsanitize=address -fno-omit-frame-pointer' -DCMAKE_EXE_LINKER_FLAGS='-fsanitize=address' "
                                    sh "make -j 16"
                                    stash includes: "carta_backend", name: "focal-backend"
                                }
                            }
                        }
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "Ubuntu 20.04 - carta-backend build - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('2 Ubuntu 22.04') {
                    agent {
                        label "jammy-agent"
                    }       
                    steps { 
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh "uname -a" 
                            sh "lsb_release -a"
                            sh "git clone https://github.com/CARTAvis/carta-backend.git"
                            dir ('carta-backend') {
                                sh "git checkout ${env.CARTA-BACKEND-BRANCH}"
                                sh "git submodule update --init --recursive"
                                dir ('build') {
                                    sh "cmake .. -DCMAKE_CXX_FLAGS='--coverage' -DCMAKE_C_FLAGS='--coverage' -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_FLAGS='-O0 -g -fsanitize=address -fno-omit-frame-pointer' -DCMAKE_EXE_LINKER_FLAGS='-fsanitize=address' "
                                    sh "make -j 16"
                                    stash includes: "carta_backend", name: "jammy-backend"
                                }
                            }
                        }
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "Ubuntu 22.04 - carta-backend build - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('3 macOS 11') {
                    agent {
                        label "macos11-agent"
                    }
                    steps {
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh "export PATH=/usr/local/bin:$PATH"
                            sh "git clone https://github.com/CARTAvis/carta-backend.git"
                            dir ('carta-backend') {
                                sh "git checkout ${env.CARTA-BACKEND-BRANCH}"
                                sh "git submodule update --init --recursive"
                                dir ('build') {
                                    sh "rm -rf *"
                                    sh "cmake .. -DDevSuppressExternalWarnings=ON -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_FLAGS='-O0 -g -fsanitize=address -fno-omit-frame-pointer' -DCMAKE_EXE_LINKER_FLAGS='-fsanitize=address' "
                                    sh "make -j 8"
                                    stash includes: "carta_backend", name: "macos11-backend"
                                }
                            }
                        }
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "macOS 11 - carta-backend build - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('4 macOS 12') {
                    agent {
                        label "macos12-agent"
                    }
                    steps {
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh "export PATH=/usr/local/bin:$PATH"
                            sh "git clone https://github.com/CARTAvis/carta-backend.git"
                            dir ('carta-backend') {
                                sh "git checkout ${env.CARTA-BACKEND-BRANCH}"
                                sh "git submodule update --init --recursive"
                                dir ('build') {
                                    sh "rm -rf *"
                                    sh "cmake .. -DDevSuppressExternalWarnings=ON -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_FLAGS='-O0 -g -fsanitize=address -fno-omit-frame-pointer' -DCMAKE_EXE_LINKER_FLAGS='-fsanitize=address' "
                                    sh "make -j 8"
                                    stash includes: "carta_backend", name: "macos12-backend"
                                }
                            }
                        }
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "macOS 12 - carta-backend build - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('5 macOS 13') {
                    agent {
                        label "macos13-agent"
                    }
                    steps {
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh "export PATH=/usr/local/bin:$PATH"
                            sh "git clone https://github.com/CARTAvis/carta-backend.git"
                            dir ('carta-backend') {
                                sh "git checkout ${env.CARTA-BACKEND-BRANCH}"
                                sh "git submodule update --init --recursive"
                                dir ('build') {
                                    sh "rm -rf *"
                                    sh "cmake .. -DDevSuppressExternalWarnings=ON -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_FLAGS='-O0 -g -fsanitize=address -fno-omit-frame-pointer' -DCMAKE_EXE_LINKER_FLAGS='-fsanitize=address' "
                                    sh "make -j 8"
                                    stash includes: "carta_backend", name: "macos13-backend"
                                }
                            }
                        }
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "macOS 13 - carta-backend build - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('6 RHEL7') {
                    agent {
                        label "rhel7-agent"
                    }
                    steps {
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh "uname -a"
                            sh "cat /etc/redhat-release"
                            sh "git clone https://github.com/CARTAvis/carta-backend.git"
                            dir ('carta-backend') {
                                sh "git checkout ${env.CARTA-BACKEND-BRANCH}"
                                sh "git submodule update --init --recursive"
                                dir ('build') {
                                    sh "source /opt/rh/devtoolset-8/enable && cmake .. -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_FLAGS='-O0 -g -fsanitize=address -fno-omit-frame-pointer' -DCMAKE_EXE_LINKER_FLAGS='-fsanitize=address' "
                                    sh "source /opt/rh/devtoolset-8/enable && make -j 16"
                                    stash includes: "carta_backend", name: "rhel7-backend"
                                }
                            }
                        }
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "RedHat 7 - carta-backend build - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('7 RHEL8') {
                    agent {
                        label "rhel8-agent"
                    }
                    steps {
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh "uname -a"
                            sh "cat /etc/redhat-release"
                            sh "git clone https://github.com/CARTAvis/carta-backend.git"
                            dir ('carta-backend') {
                                sh "git checkout ${env.CARTA-BACKEND-BRANCH}"
                                sh "git submodule update --init --recursive"
                                dir ('build') {
                                    sh "cmake .. -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_FLAGS='-O0 -g -fsanitize=address -fno-omit-frame-pointer' -DCMAKE_EXE_LINKER_FLAGS='-fsanitize=address' "
                                    sh "make -j 16"
                                    stash includes: "carta_backend", name: "rhel8-backend"
                                }
                            }
                        }
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "RedHat 8 - carta-backend build - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
                stage('8 RHEL9') {
                    agent {
                        label "rhel9-agent"
                    }
                    steps {
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            sh "uname -a"
                            sh "cat /etc/redhat-release"
                            sh "git clone https://github.com/CARTAvis/carta-backend.git"
                            dir ('carta-backend') {
                                sh "git checkout ${env.CARTA-BACKEND-BRANCH}"
                                sh "git submodule update --init --recursive"
                                dir ('build') {
                                    sh "cmake .. -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_FLAGS='-O0 -g -fsanitize=address -fno-omit-frame-pointer' -DCMAKE_EXE_LINKER_FLAGS='-fsanitize=address' "
                                    sh "make -j 16"
                                    stash includes: "carta_backend", name: "rhel9-backend"
                                }
                            }
                        }
                    }
                    post {
                        failure {
                            slackSend color: 'danger', message: "RedHat 9 - carta-backend build - Fail - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
                        }
                    }
                }
            }
        }
        stage('ICD tests') {
            matrix {
                axes {
                    axis {
                        name 'PLATFORM'
                        values 'focal', 'jammy', 'rhel7', 'rhel8', 'rhel9', 'macos11', 'macos12', 'macos13'
                    }
                }
                stages {
                    stage('session and file_browser') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: "ICD test session and file_browser failure") {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                file_browser()
                            }
                        }
                    }
                    stage('animator') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                             warnError(catchInterruptions: true, message: 'ICD test animator failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                animator()
                            }
                        }
                    }
                    stage('region_statistics') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test region_statistics failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                region_statistics()
                            }
                        }
                    }
                    stage('region_manipulation') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test region_manipulation failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                region_manipulation()
                            }
                        }
                    }
                    stage('cube_histogram') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test cube_histogram failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                cube_histogram()
                            }
                        }
                    }
                    stage('pv_generator') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test pv_generator failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                pv_generator()
                            }
                        }
                    }
                    stage('raster_tiles') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test raster_tiles failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                raster_tiles()
                            }
                        }
                    }
                    stage('catalog') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test catalog failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                catalog()
                            }
                        }
                    }
                    stage('moment') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test moment failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                moment()
                            }
                        }
                    }
                    stage('resume') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test resume failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                resume()
                            }
                        }
                    }
                    stage('match') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test match failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                match()
                            }
                        }
                    }
                    stage('close_file') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test close_file failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                close_file()
                            }
                        }
                    }
                    stage('image_fitting') {
                        agent {
                            label "${PLATFORM}-agent"
                        }
                        steps {
                            warnError(catchInterruptions: true, message: 'ICD test image_fitting failure') {
                                unstash "${PLATFORM}-backend"
                                sh "rm -f /root/.carta/log/carta.log"
                                sh "ASAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan.supp LSAN_OPTIONS=suppressions=${WORKSPACE}/debug/asan/myasan-leaks.supp ASAN_SYMBOLIZER_PATH=llvm-symbolizer ./carta_backend /images --top_level_folder /images --port ${env.PORT} --omp_threads 4 --debug_no_auth --no_frontend --no_database --verbosity=5 &"
                                unstash "${PLATFORM}-ICD"
                                image_fitting()
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            slackSend color: 'good', message: "ICD-RxJS branch test suite - Success - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
            withCredentials([string(credentialsId: 'acdc-jenkins-token', variable: 'TOKEN')]) {
            sh("""curl -X POST -H "Accept: application/vnd.github+json" \
            -H "Authorization: token $TOKEN" https://api.github.com/repos/CARTAvis/carta-backend/statuses/${COMMIT_ID_LONG} \
            -d "{\\"state\\":\\"success\\",\\"target_url\\":\\"${env.RUN_DISPLAY_URL}\\",\\"description\\":\\"Success\\",\\"context\\":\\"ICD test suite\\"}" """)
            }

        }
        unstable {
            slackSend color: 'warning', message: "ICD-RxJS branch test suite - Unstable - ${BRANCH_NAME} <${env.RUN_DISPLAY_URL}|${COMMIT_ID_SHORT}>";
            withCredentials([string(credentialsId: 'acdc-jenkins-token', variable: 'TOKEN')]) {
            sh("""curl -X POST -H "Accept: application/vnd.github+json" \
            -H "Authorization: token $TOKEN" https://api.github.com/repos/CARTAvis/carta-backend/statuses/${COMMIT_ID_LONG} \
            -d "{\\"state\\":\\"error\\",\\"target_url\\":\\"${env.RUN_DISPLAY_URL}\\",\\"description\\":\\"Unstable\\",\\"context\\":\\"ICD test suite\\"}" """)
            }
        }
    }
}

def COMMIT_ID_SHORT

def COMMIT_ID_LONG

def BRANCH_NAME

def prepare_focal_ICD() {
    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        sh "sed -i '4 i\\    \"type\": \"module\",' package.json"
        sh "git submodule init && git submodule update && npm install"
        dir ('protobuf') {
            sh "./build_proto.sh"
        }
        dir ('src/test') { 
            sh "perl -p -i -e 's/3002/${env.PORT}/' config.json"
        }
    stash includes: "**/*", name: "focal-ICD"
    }
}

def prepare_jammy_ICD() {
    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        sh "sed -i '4 i\\    \"type\": \"module\",' package.json"
        sh "git submodule init && git submodule update && npm install"
        dir ('protobuf') {
            sh "./build_proto.sh"
        }
        dir ('src/test') {
            sh "perl -p -i -e 's/3002/${env.PORT}/' config.json"
        }
    stash includes: "**/*", name: "jammy-ICD"
    }
}


def prepare_rhel7_ICD() {
    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        sh "sed -i '4 i\\    \"type\": \"module\",' package.json"
        sh "git submodule init && git submodule update && npm install"
        dir ('protobuf') {
            sh "./build_proto.sh"
        }
        dir ('src/test') {
            sh "perl -p -i -e 's/3002/${env.PORT}/' config.json"
        }
    stash includes: "**/*", name: "rhel7-ICD"
    }
}

def prepare_rhel8_ICD() {
    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        sh "sed -i '4 i\\    \"type\": \"module\",' package.json"
        sh "git submodule init && git submodule update && npm install"
        dir ('protobuf') {
            sh "./build_proto.sh"
        }
        dir ('src/test') {
            sh "perl -p -i -e 's/3002/${env.PORT}/' config.json"
        }
    stash includes: "**/*", name: "rhel8-ICD"
    }
}

def prepare_rhel9_ICD() {
    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        sh "sed -i '4 i\\    \"type\": \"module\",' package.json"
        sh "git submodule init && git submodule update && npm install"
        dir ('protobuf') {
            sh "./build_proto.sh"
        }
        dir ('src/test') {
            sh "perl -p -i -e 's/3002/${env.PORT}/' config.json"
        }
    stash includes: "**/*", name: "rhel9-ICD"
    }
}

def prepare_macos11_ICD() {
    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        sh "git submodule init && git submodule update && npm install"
        dir ('protobuf') {
            sh "./build_proto.sh"
        }
        dir ('src/test') {
            sh "perl -p -i -e 's/3002/${env.PORT}/' config.json"
        }
    stash includes: "**/*", name: "macos11-ICD"
    }
}

def prepare_macos12_ICD() {
    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        sh "git submodule init && git submodule update && npm install"
        script {
            COMMIT_ID_SHORT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
            COMMIT_ID_LONG = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
            BRANCH_NAME = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
        }
        dir ('protobuf') {
            sh "./build_proto.sh"
        }
        dir ('src/test') {
            sh "perl -p -i -e 's/3002/${env.PORT}/' config.json"
        }
    stash includes: "**/*", name: "macos12-ICD"
    }
}

def prepare_macos13_ICD() {
    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        sh "git submodule init && git submodule update && npm install"
        dir ('protobuf') {
            sh "./build_proto.sh"
        }
        dir ('src/test') {
            sh "perl -p -i -e 's/3002/${env.PORT}/' config.json"
        }
    stash includes: "**/*", name: "macos13-ICD"
    }
}

def file_browser() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "CI=true npm test src/test/ACCESS_WEBSOCKET.test.ts # test 1 of 5"
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/GET_FILELIST_ROOTPATH_CONCURRENT.test.ts # test 2 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/FILEINFO_FITS_MULTIHDU.test.ts # test 3 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/FILEINFO_EXCEPTIONS.test.ts # test 4 of 5"
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/OPEN_SWAPPED_IMAGES.test.ts # test 5 of 5"
                sh "pgrep carta_backend"
            }
        }
    }
}

def animator() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/ANIMATOR_DATA_STREAM.test.ts # test 1 of 6"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/ANIMATOR_NAVIGATION.test.ts # test 2 of 6"
                sh "sleep 3 && pgrep carta_backend"
                sh "#CI=true npm test src/test/ANIMATOR_CONTOUR_MATCH.test.ts # test 3 of 6"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/ANIMATOR_CONTOUR.test.ts # test 4 of 6"
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/ANIMATOR_PLAYBACK.test.ts # test 5 of 6"
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/ANIMATOR_SWAPPED_IMAGES.test.ts # test 6 of 6"
                sh "pgrep carta_backend"
            }
        }
    }
}

def region_statistics() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/REGION_STATISTICS_RECTANGLE.test.ts # test 1 of 3"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/REGION_STATISTICS_ELLIPSE.test.ts # test 2 of 3"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/REGION_STATISTICS_POLYGON.test.ts # test 3 of 3"
                sh "pgrep carta_backend"
            }
        }
    }
}

def region_manipulation() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/CASA_REGION_INFO.test.ts # test 1 of 8"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/CASA_REGION_IMPORT_INTERNAL.test.ts # test 2 of 8"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/CASA_REGION_IMPORT_EXPORT.test.ts # test 3 of 8"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/CASA_REGION_IMPORT_EXCEPTION.test.ts # test 4 of 8"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/CASA_REGION_EXPORT.test.ts # test 5 of 8"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/DS9_REGION_EXPORT.test.ts # test 6 of 8"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/DS9_REGION_IMPORT_EXCEPTION.test.ts # test 7 of 8"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/DS9_REGION_IMPORT_EXPORT.test.ts # test 8 of 8"
                sh "pgrep carta_backend"
            }
        }
    }
}

def cube_histogram() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/PER_CUBE_HISTOGRAM.test.ts # test 1 of 3"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/PER_CUBE_HISTOGRAM_HDF5.test.ts # test 2 of 3"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/PER_CUBE_HISTOGRAM_CANCELLATION.test.ts # test 3 of 3"
                sh "pgrep carta_backend"
            }
        }
    }
}

def pv_generator() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/PV_GENERATOR_CANCEL.test.ts # test 1 of 7"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/PV_GENERATOR_CASA.test.ts # test 2 of 7"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/PV_GENERATOR_FITS.test.ts  # test 3 of 7"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/PV_GENERATOR_HDF5_COMPARED_FITS.test.ts  # test 4 of 7"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/PV_GENERATOR_MATCH_SPATIAL.test.ts  # test 5 of 7"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/PV_GENERATOR_NaN.test.ts  # test 6 of 7"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/PV_GENERATOR_WIDE.test.ts  # test 7 of 7"                
                sh "sleep 3 && pgrep carta_backend"
            }
        }
    }
}

def raster_tiles() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/CHECK_RASTER_TILE_DATA.test.ts # test 1 of 2"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/TILE_DATA_REQUEST.test.ts # test 2 of 2"
                sh "pgrep carta_backend"
            }
        }
    }
}

def catalog() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/CATALOG_GENERAL.test.ts # test 1 of 1"
            }
        }
    }
}

def moment() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/MOMENTS_GENERATOR_CASA.test.ts # test 1 of 6"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/MOMENTS_GENERATOR_EXCEPTION.test.ts # test 2 of 6"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/MOMENTS_GENERATOR_SAVE.test.ts # test 3 of 6"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/MOMENTS_GENERATOR_CANCEL.test.ts # test 4 of 6"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/MOMENTS_GENERATOR_FITS.test.ts # test 5 of 6"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/MOMENTS_GENERATOR_HDF5.test.ts # test 6 of 6"
                sh "pgrep carta_backend"
            }
        }
    }
}

def resume() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/RESUME_CATALOG.test.ts # test 1 of 4"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/RESUME_CONTOUR.test.ts # test 2 of 4"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/RESUME_IMAGE.test.ts # test 3 of 4"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/RESUME_REGION.test.ts # test 4 of 4"
                sh "pgrep carta_backend"
            }
        }
    }
}

def match() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                     ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/MATCH_SPATIAL.test.ts # test 1 of 3"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/MATCH_STATS.test.ts # test 2 of 3"
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/MATCH_SPECTRAL.test.ts # test 3 of 3"
                sh "pgrep carta_backend"
            }
        }
    }
}

def close_file() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                    ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/CLOSE_FILE_SINGLE.test.ts # test 1 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/CLOSE_FILE_ANIMATION.test.ts # test 2 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/CLOSE_FILE_ERROR.test.ts # test 3 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/CLOSE_FILE_SPECTRAL_PROFILE.test.ts # test 4 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/CLOSE_FILE_TILE.test.ts # test 5 of 5"
                sh "pgrep carta_backend"
            }
        }
    }
}

def image_fitting() {
    script {
        dir ('ICD-RxJS') {
            sh "npm install && ./protobuf/build_proto.sh"
            ret = false
            retry(3) {
                if (ret) {
                    sleep(time:30,unit:"SECONDS")
                    sh "cat /root/.carta/log/carta.log"
                    echo "Trying again"
                } else {
                     ret = true
                }
                sh "pgrep carta_backend"
                sh "CI=true npm test src/test/IMAGE_FITTING_CASA.test.ts # test 1 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/IMAGE_FITTING_FITS.test.ts # test 2 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/IMAGE_FITTING_HDF5.test.ts # test 3 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/IMAGE_FITTING_CANCEL.test.ts # test 4 of 5"
                sh "sleep 3 && pgrep carta_backend"
                sh "CI=true npm test src/test/IMAGE_FITTING_BAD.test.ts # test 5 of 5"
                sh "pgrep carta_backend"

            }
        }
    }
}
