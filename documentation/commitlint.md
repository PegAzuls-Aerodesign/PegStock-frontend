# Commitlint: Commit Message Standards

This document explains the rules and conventions for commit messages in this project, using Commitlint to ensure consistency.

## Commit Message Format

Each commit message must follow this format:

```
<type>(<scope>): <subject>
<body>
<footer>
```

### Example

```
feat(api): add users list endpoint

Adds new GET /users endpoint to return registered users list.

Refs: #123
```

## Required Components

### 1. Type (Required)
Indicates the purpose of the commit:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes (spaces, commas, etc.)
- `refactor`: Code refactoring without behavior changes
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks (dependency updates, configs, etc.)
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverts a previous commit

### 2. Scope (Optional)
Indicates the affected part of the system (e.g., `auth`, `ui`, `api`, `database`).

### 3. Subject (Required)
- Concise description (max 72 chars)
- Starts with lowercase letter
- No period at the end

### 4. Body (Optional)
- More detailed description (if needed)
- Separated from subject by blank line
- Each line max 72 chars

### 5. Footer (Optional)
- Issue references (e.g., `Fixes #123`, `Closes #456`)
- Breaking changes information (if applicable)

## Additional Rules

1. **English messages**: All messages must be in English.
2. **Present tense verbs**: Use present tense verbs ("add" instead of "added").
3. **Breaking changes**: If the commit introduces breaking changes, it must include in the footer:
   ```
   BREAKING CHANGE: <change description>
   ```

## Valid Examples

```
fix(login): fix email validation

Fixes regex that validated emails with new domains.
```

```
chore: update package.json dependencies
```

```
feat(api)!: remove v1 API support

BREAKING CHANGE: v1 API has been discontinued, migrate to v2.
```

## Automatic Validation

Commitlint is configured to reject commits that don't follow this standard. To test your message before committing:

```bash
echo "your commit message" | commitlint
```

## Recommendations

- Use the 'commitlint' extension in your code editor for real-time validation.

## References

- [Commitlint](https://commitlint.js.org/)
