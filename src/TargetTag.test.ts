import TargetTag from './TargetTag';

it('Should exist when found', () => {
  const tag = TargetTag.for('v1.2.3');
  tag.found();
  expect(tag.exists).toBeTruthy();
});

it('Should not exist when found', () => {
  const tag = TargetTag.for('v1.2.3');
  expect(tag.exists).toBeFalsy();
});

it('Should have a release', () => {
  const tag = TargetTag.for('v1.2.3');
  tag.foundRelease();
  expect(tag.hasRelease).toBeTruthy();
});

it('Should not have a release', () => {
  const tag = TargetTag.for('v1.2.3');
  expect(tag.hasRelease).toBeFalsy();
});

it('Can upsert when overwritable but and not found', () => {
  const tag = TargetTag.for('v1.2.3', { canOverwrite: true });
  expect(tag.upsertable).toBeTruthy();
});

it('Can upsert when overwritable but found', () => {
  const tag = TargetTag.for('v1.2.3', { canOverwrite: true });
  tag.found();
  expect(tag.upsertable).toBeTruthy();
});

it('Can upsert when not overwritable and not found', () => {
  const tag = TargetTag.for('v1.2.3', { canOverwrite: false });
  expect(tag.upsertable).toBeTruthy();
});

it('Cannot upsert when not overwritable but found', () => {
  const tag = TargetTag.for('v1.2.3');
  tag.found();
  expect(tag.upsertable).toBeFalsy();
});

it('Can reference release when not not found', () => {
  const tag = TargetTag.for('v1.2.3', { canOverwrite: false, canReferenceRelease: false });
  expect(tag.canReferenceReleaseIfExists).toBeTruthy();
});

it('Can reference release when found', () => {
  const tag = TargetTag.for('v1.2.3', { canOverwrite: false, canReferenceRelease: true });
  tag.found();
  tag.foundRelease();
  expect(tag.canReferenceReleaseIfExists).toBeTruthy();
});

it('Cannot reference release when found', () => {
  const tag = TargetTag.for('v1.2.3', { canReferenceRelease: false });
  tag.found();
  tag.foundRelease();
  expect(tag.canReferenceReleaseIfExists).toBeFalsy();
});

it('Should convert to tag name on toString', () => {
  const tag = TargetTag.for('v1.2.3');
  expect(tag.toString()).toBe('v1.2.3');
});
