/**
 * Business Frontend Test Template
 * Copy this to test your custom pages/components
 * 
 * Example: business/frontend/tests/EmailDashboard.test.jsx
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import api from 'saas-boilerplate/utils/api';

// Import your component
// import EmailDashboard from '../pages/EmailDashboard';

// Mock API
jest.mock('saas-boilerplate/utils/api');

// Mock hooks
jest.mock('saas-boilerplate/core/hooks', () => ({
  useAuth: () => ({
    user: { sub: 'auth0|123', name: 'Test User' },
    isLoading: false
  }),
  useAnalytics: () => ({
    trackPageView: jest.fn(),
    trackEvent: jest.fn()
  })
}));

describe('YourPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders page title', () => {
    // render(
    //   <BrowserRouter>
    //     <YourPage />
    //   </BrowserRouter>
    // );
    
    // expect(screen.getByText(/Your Page Title/i)).toBeInTheDocument();
  });
  
  test('loads data on mount', async () => {
    const mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];
    
    api.get = jest.fn().mockResolvedValue({ data: mockData });
    
    // render(
    //   <BrowserRouter>
    //     <YourPage />
    //   </BrowserRouter>
    // );
    
    // await waitFor(() => {
    //   expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
    // });
    
    // expect(api.get).toHaveBeenCalledWith('/your-endpoint');
  });
  
  test('handles button click', async () => {
    api.post = jest.fn().mockResolvedValue({ data: { success: true } });
    
    // render(
    //   <BrowserRouter>
    //     <YourPage />
    //   </BrowserRouter>
    // );
    
    // const button = screen.getByText(/Submit/i);
    // fireEvent.click(button);
    
    // await waitFor(() => {
    //   expect(api.post).toHaveBeenCalled();
    // });
  });
  
  test('displays error message on API failure', async () => {
    api.get = jest.fn().mockRejectedValue(new Error('Network error'));
    
    // render(
    //   <BrowserRouter>
    //     <YourPage />
    //   </BrowserRouter>
    // );
    
    // await waitFor(() => {
    //   expect(screen.getByText(/error/i)).toBeInTheDocument();
    // });
  });
});


// Example: InboxTamer Email Dashboard Test
describe('EmailDashboard - Example', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders email list', async () => {
    const mockEmails = [
      {
        id: 1,
        from: 'sender@example.com',
        subject: 'Test Email',
        preview: 'This is a test',
        important: false
      }
    ];
    
    api.get = jest.fn().mockResolvedValue({ data: mockEmails });
    
    // render(
    //   <BrowserRouter>
    //     <EmailDashboard />
    //   </BrowserRouter>
    // );
    
    // await waitFor(() => {
    //   expect(screen.getByText(/Test Email/i)).toBeInTheDocument();
    //   expect(screen.getByText(/sender@example.com/i)).toBeInTheDocument();
    // });
  });
  
  test('filters emails by category', async () => {
    const mockEmails = [
      { id: 1, subject: 'Important', important: true },
      { id: 2, subject: 'Regular', important: false }
    ];
    
    api.get = jest.fn().mockResolvedValue({ data: mockEmails });
    
    // render(
    //   <BrowserRouter>
    //     <EmailDashboard />
    //   </BrowserRouter>
    // );
    
    // Click "Important" filter
    // const importantFilter = screen.getByText(/Important/i);
    // fireEvent.click(importantFilter);
    
    // await waitFor(() => {
    //   expect(api.get).toHaveBeenCalledWith('/inbox/emails', {
    //     params: { filter: 'important' }
    //   });
    // });
  });
  
  test('archives email', async () => {
    const mockEmails = [
      { id: 1, from: 'test@example.com', subject: 'Test' }
    ];
    
    api.get = jest.fn().mockResolvedValue({ data: mockEmails });
    api.post = jest.fn().mockResolvedValue({ data: { success: true } });
    
    // render(
    //   <BrowserRouter>
    //     <EmailDashboard />
    //   </BrowserRouter>
    // );
    
    // await waitFor(() => {
    //   expect(screen.getByText(/Test/i)).toBeInTheDocument();
    // });
    
    // Click archive button
    // const archiveButton = screen.getByText(/Archive/i);
    // fireEvent.click(archiveButton);
    
    // await waitFor(() => {
    //   expect(api.post).toHaveBeenCalledWith('/inbox/emails/1/archive');
    // });
  });
  
  test('shows empty state when no emails', async () => {
    api.get = jest.fn().mockResolvedValue({ data: [] });
    
    // render(
    //   <BrowserRouter>
    //     <EmailDashboard />
    //   </BrowserRouter>
    // );
    
    // await waitFor(() => {
    //   expect(screen.getByText(/No emails found/i)).toBeInTheDocument();
    // });
  });
});


// Component Testing Best Practices
describe('Testing Best Practices', () => {
  test('example: test user interactions', () => {
    // 1. Render component
    // 2. Find interactive element (button, input, etc)
    // 3. Simulate user action (click, type, etc)
    // 4. Assert expected outcome
  });
  
  test('example: test async data loading', async () => {
    // 1. Mock API call
    // 2. Render component
    // 3. Use waitFor to wait for data
    // 4. Assert data is displayed
  });
  
  test('example: test form submission', async () => {
    // 1. Render form
    // 2. Fill in inputs
    // 3. Submit form
    // 4. Assert API was called with correct data
    // 5. Assert success message shown
  });
  
  test('example: test error handling', async () => {
    // 1. Mock API to reject
    // 2. Render component
    // 3. Trigger action that calls API
    // 4. Assert error message shown
  });
});
