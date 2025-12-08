#!/bin/bash

echo "=== Running tests in batches to identify hangs ==="
echo "Started at: $(date)"

# Array of specific test files (avoiding globs that don't work in vitest CLI)
test_patterns=(
  "src/utils/helpers.test.ts"
  "src/hooks/useAppNavigation.test.ts"
  "src/components/ErrorBoundary.test.tsx"
  "src/components/AgreementWizard/steps/BasicInformationStep.test.tsx"
  "src/components/AgreementWizard/steps/BillingDetailsStep.test.tsx"
  "src/components/AgreementWizard/steps/ProductsStep.test.tsx"
  "src/components/AgreementWizard/steps/ProgramFeesStep.test.tsx"
  "src/pages/Dashboard/Dashboard.test.tsx"
  "src/pages/Dashboard/components/AgreementFilters.test.tsx"
  "src/pages/Dashboard/components/DashboardStats.test.tsx"
  "src/pages/AgreementDetails/AgreementDetails.test.tsx"
  "src/pages/CreateAgreement/CreateAgreement.test.tsx"
  "src/pages/ModifyAgreement/ModifyAgreement.test.tsx"
  "src/pages/PendingModificationRequests/PendingModificationRequests.test.tsx"
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
  
  if timeout 60s npm test -- --run --reporter=default "$pattern"; then
    echo "✓ Passed: $pattern"
    passed=$((passed + 1))
  else
    exit_code=$?
    if [ $exit_code -eq 124 ] || [ $exit_code -eq 143 ]; then
      echo "✗ TIMEOUT: $pattern (hung after 60s)"
      failed=$((failed + 1))
      exit 1
    else
      echo "✗ Failed: $pattern (exit code: $exit_code)"
      failed=$((failed + 1))
      exit $exit_code
    fi
  fi
  total=$((total + 1))
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
