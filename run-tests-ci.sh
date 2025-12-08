#!/bin/bash
set -e

echo "=== Running tests in batches to identify hangs ==="
echo "Started at: $(date)"

# Array of test directories/patterns
test_patterns=(
  "src/utils/**/*.test.ts*"
  "src/hooks/**/*.test.ts*"
  "src/components/ErrorBoundary.test.tsx"
  "src/components/AgreementWizard/**/*.test.ts*"
  "src/pages/Dashboard/**/*.test.ts*"
  "src/pages/AgreementDetails/**/*.test.ts*"
  "src/pages/CreateAgreement/**/*.test.ts*"
  "src/pages/ModifyAgreement/**/*.test.ts*"
  "src/pages/PendingModificationRequests/**/*.test.ts*"
  "src/App.test.tsx"
)

total=0
passed=0
failed=0

for pattern in "${test_patterns[@]}"; do
  echo ""
  echo "----------------------------------------"
  echo "Running tests matching: $pattern"
  echo "----------------------------------------"
  
  if timeout 60s npm test -- --run --reporter=basic "$pattern"; then
    echo "✓ Passed: $pattern"
    ((passed++))
  else
    exit_code=$?
    if [ $exit_code -eq 124 ] || [ $exit_code -eq 143 ]; then
      echo "✗ TIMEOUT: $pattern (hung after 60s)"
      ((failed++))
      exit 1
    else
      echo "✗ Failed: $pattern (exit code: $exit_code)"
      ((failed++))
      exit $exit_code
    fi
  fi
  ((total++))
done

echo ""
echo "========================================"
echo "Test Summary"
echo "========================================"
echo "Total batches: $total"
echo "Passed: $passed"
echo "Failed: $failed"
echo "Completed at: $(date)"

if [ $failed -gt 0 ]; then
  exit 1
fi
