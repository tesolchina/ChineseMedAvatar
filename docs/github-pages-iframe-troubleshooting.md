# GitHub Pages Iframe Troubleshooting Guide

## Current Issue Analysis

Our testing has revealed that iframes work perfectly when accessing HTML files directly in the browser, but may face issues when deployed via GitHub Pages. This document outlines the troubleshooting steps and potential solutions.

## Possible Causes

### 1. Content Security Policy (CSP)
GitHub Pages may have CSP headers that restrict iframe sources.

**Solution Options:**
- Add `_headers` file to repository root
- Use meta tags in HTML head section
- Contact textbot.hkbu.tech to verify their X-Frame-Options policy

### 2. X-Frame-Options Header
The target domain (textbot.hkbu.tech) may send X-Frame-Options headers that prevent embedding.

**Testing Commands:**
```bash
curl -I https://textbot.hkbu.tech/chat/tcm-clinical-interview
curl -I https://textbot.hkbu.tech/chat/tcm-concept-explanation
```

### 3. HTTPS/Mixed Content Issues
GitHub Pages enforces HTTPS, which may cause mixed content blocking.

**Verification:**
- All our iframe URLs use HTTPS ✅
- textbot.hkbu.tech uses HTTPS ✅

### 4. GitHub Pages Domain Configuration
GitHub Pages may have specific iframe policies for custom domains vs github.io domains.

## Testing Strategy

### Phase 1: Direct URL Testing
1. Test each chat URL directly in browser ✅
2. Verify all URLs respond correctly ✅
3. Check browser console for any errors ❌ (Pending)

### Phase 2: Local HTML File Testing
1. Open HTML files directly from file system ✅ (User confirmed working)
2. Verify iframe loading behavior ✅ (User confirmed working)
3. Check for any console errors ❌ (Pending)

### Phase 3: GitHub Pages Testing
1. Deploy comprehensive test suite ⏳ (In progress)
2. Test from GitHub Pages URL ❌ (Pending)
3. Monitor browser console for errors ❌ (Pending)
4. Check network tab for blocked requests ❌ (Pending)

## Potential Solutions

### Solution 1: CSP Meta Tags
Add to HTML head section:
```html
<meta http-equiv="Content-Security-Policy" content="frame-src 'self' https://textbot.hkbu.tech; default-src 'self';">
```

### Solution 2: GitHub Pages Headers File
Create `_headers` file in root:
```
/*
  Content-Security-Policy: frame-src 'self' https://textbot.hkbu.tech
  X-Frame-Options: SAMEORIGIN
```

### Solution 3: Alternative Embedding Methods
- Use postMessage API for cross-origin communication
- Implement popup window approach
- Use redirect-based integration

### Solution 4: Domain Configuration
- Test with custom domain instead of github.io
- Verify DNS and SSL certificate settings

## Next Steps

1. **Deploy Comprehensive Test Suite** ✅ (Complete)
   - Created avatar-iframe-test.html with all 6 scenarios
   - Includes status monitoring and error handling
   - Provides direct links for comparison testing

2. **Monitor Test Results**
   - Check browser console for CSP violations
   - Monitor network tab for blocked requests
   - Document specific error messages

3. **Implement Solutions Based on Findings**
   - Add CSP headers if needed
   - Contact textbot.hkbu.tech if X-Frame-Options blocking
   - Implement alternative embedding if necessary

4. **Validate All Scenarios**
   - Test all 6 avatar chat scenarios
   - Verify iframe functionality across different browsers
   - Ensure responsive design works within iframes

## Browser Console Checklist

When testing, look for these specific error types:

1. **CSP Violations:**
   ```
   Content Security Policy: The page's settings blocked the loading of a resource
   ```

2. **X-Frame-Options Blocking:**
   ```
   Refused to display in a frame because it set 'X-Frame-Options' to 'deny'
   ```

3. **Mixed Content:**
   ```
   Mixed Content: The page was loaded over HTTPS, but requested an insecure resource
   ```

4. **CORS Errors:**
   ```
   Cross-Origin Request Blocked: The Same Origin Policy disallows reading
   ```

## Success Metrics

- [ ] All 6 avatar scenarios load in iframes
- [ ] No console errors during iframe loading
- [ ] Responsive design maintained within iframes
- [ ] Full chat functionality available within embedded frames
- [ ] Fast loading times (<3 seconds per iframe)
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

## Contact Information

If iframe blocking persists, may need to contact:
- textbot.hkbu.tech administrators for X-Frame-Options policy
- GitHub Support for Pages-specific iframe limitations
- Alternative hosting solutions if GitHub Pages proves incompatible