#!/bin/bash
echo "Fixing permissions for files and directories"
find api assets views -type f | xargs chmod 664
find api assets views -type d | xargs chmod 771
